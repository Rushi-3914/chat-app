import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Unsubscribe } from '@angular/fire/app-check';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.css']
})
export class ChatDashboardComponent {
  currentUser!: User | null;


  toUser!:User | null;

  message:string='';
  chatRefNode: string='';
  oppChatRefNode: string='';
  chatSubscription: Subscription| undefined;
  chats: Message[]=[];

  // for scrolling down
  @ViewChild("messageBox",{static:false}) messageBox!:ElementRef
  

  constructor(
    public  authService:AuthService,
    private fireAuth:AngularFireAuth,
    private fireDatabase:AngularFireDatabase,
    private router:Router,
    private toast:ToastrService
    ) { 

      // get current logged in user
      // localstoarage
      // firebase auth

      this.fireAuth.authState.subscribe((user)=>{
        console.log(user)

        this.authService.getUserById(user?.uid).subscribe((user)=>{
          this.currentUser=user;
          console.log(this.currentUser);
        })
      })
    }

    startChatParent(uid:string){
      console.log("parent :"+uid);

      if(this.chatSubscription){
        this.chatSubscription.unsubscribe();
      }

      // before loading blank
      this.chats=[];
      // creating /storing /chats nodes
      this.chatRefNode=`chats/${this.currentUser?.uid}****${uid}`
       this.oppChatRefNode=`chats/${uid}****${this.currentUser?.uid}`

      this.authService.getUserById(uid).subscribe({
        next:(user)=>{
          this.toUser=user;
          console.log(this.toUser)
          document.title=user?.name || 'Chat App';
          this.scrollBottom();
          this.loadChat();
        },
        error:(error)=>{
          console.log(error);
          this.toast.error("Error in starting chat.!!")
        }
      })
        
    }


  loadChat() {
    this.chatSubscription=this.fireDatabase.list(this.chatRefNode).valueChanges().subscribe((chatList:any[])=>{
      this.chats=chatList;

      if(this.chats.length<=0)
      {
        this.chatSubscription?.unsubscribe();//unsubscribe first chat
        this.chatSubscription=this.fireDatabase.list(this.oppChatRefNode).valueChanges().subscribe((chatList:any[])=>{
          this.chats=chatList;
          this.chatRefNode=this.oppChatRefNode;
          this.scrollBottom();

        })
      }else{
        this.scrollBottom();
      }
    })
  }


    // send meassage 
    sendMessage(event:SubmitEvent){

      event.preventDefault();
      if(this.message.trim()==''){
        return;
      }
      console.log(this.message);

      const message:Message=new Message();

      message.message=this.message;
      message.from=this.currentUser?.uid || ''
      message.to=this.toUser?.uid || ''
      

      // ref object
      const chatRef:AngularFireObject<Message>=this.fireDatabase.object(`${this.chatRefNode}/${new Date()}`)
      chatRef.set(message).then((data)=>{
      this.toast.success("Message send success")
      this.scrollBottom()
      this.message=''
      }).catch(error=>{
        console.log(error)
        this.toast.error("Eroor in message sending message !!")
      });

    }

    scrollBottom(){
      this.messageBox.nativeElement.scrollTo({
        left:0,
        top:this.messageBox.nativeElement.scrollHeight,
        behavior:'smooth',
      })
    }
 


}
