import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  public userList:User[]=[]

  // we want to emmite this event outside of the component=>@Output
  @Output() startChatEmmiter:EventEmitter<string>=new EventEmitter();

  constructor(private fireDb:AngularFireDatabase){

  const userListRef:AngularFireList<User>=this.fireDb.list('users')
  userListRef.valueChanges().subscribe((users)=>{
    this.userList=users;
  })
  }

  startChatChild(uid:string){
    // also parent comp know the event start so we create eventemmiter
    this.startChatEmmiter.next(uid)
  }
}
