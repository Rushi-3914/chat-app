import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth:AngularFireAuth,
    private fireDatabase:AngularFireDatabase,
    private router:Router,
    private toast:ToastrService
    ) { }


    // ,ethod for registration
    register(user:User){
      this.fireAuth.createUserWithEmailAndPassword(user.email,user.password).then(result=>{
        console.log(result)
        this.toast.success('svaing user data',"Registarion Success !!")
        
        //then we save the users other data
        user.uid=result.user?.uid || '';
        user.displayName=result.user?.displayName || user.name.toUpperCase();
        user.emailVeryfied=result.user?.emailVerified || false;
        user.password='';
        user.imageUrl=result.user?.photoURL||'https://www.pngfind.com/pngs/m/80-804949_profile-icon-for-the-politics-category-circle-hd.png';

        this.saveUserData(user).then(data=>{
          console.log(data)
          this.toast.success("User Data Saved !!")
          this.setUserToLocalStorage(user)
        }).catch(error=>{
          console.log(error)
          this.toast.error("Error in saving data !!")
        })
      }).catch(error=>{
        console.log(error)
        this.toast.error("Error in singUp !!")
      })
    }
    // method for save user in realtime databse 
  saveUserData(user: User) {
    // 
    const userRefObject:AngularFireObject<User>=this.fireDatabase.object(`users/${user.uid}`)

    return userRefObject.set(user)
  }


  // method to save user in local storage
  setUserToLocalStorage(user:User|null){
    localStorage.setItem('user',JSON.stringify(user))
  }


  // checking user status-return the status of the user,if user if logged in then return user otherwise null
  getLoggedInStatus(){
    const userString=localStorage.getItem('user');
    if(userString==null){
      return false
    }else{
      return JSON.parse(userString)
    }
  }


  // logout from Local storage->remove the user from the local storage
  logoutFromLocalStorage(){
    localStorage.removeItem('user')
  }

  // signout from firebase->logout the user from the firebase and also remove the user from the local stoarage
  signOut(){
    this.fireAuth.signOut().then(()=>{
      this.logoutFromLocalStorage();
      this.router.navigate(['/login'])
    }).catch(error=>{
      console.log(error)
      this.toast.error("Error in logging out !!")
    })
  }

  // lohin the user
  login(email:string,password:string){
   return this.fireAuth.signInWithEmailAndPassword(email,password)
  }


  // get iuser

  getUserById(uid:string | undefined):Observable<User | null>{
    const objectRef:AngularFireObject<User>= this.fireDatabase.object(`users/${uid}`)
    return objectRef.valueChanges();
  }
}
