import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private toastr:ToastrService ,private authService:AuthService,private router:Router){}

//if you want to create seaprate module for loging 

  loginData={
    email:'',
    password:''
  }


  loginformsubmitted(event:SubmitEvent){
    event.preventDefault();
    console.log(this.loginData);

    if(this.loginData.email.trim()==''){
      this.toastr.error("Email is required !!")
      return;
    }
    if(this.loginData.password.trim()==''){
      this.toastr.error("Password is required !!")
      return;
    }

    // if all is okkkk,the login kara
    this.authService.login(this.loginData.email,this.loginData.password)
    .then(result=>{
      //login success
      console.log(result)
      // return result.user;
      this.authService.getUserById(result.user?.uid).subscribe((user:User|null)=>{
        console.log(user);
        this.authService.setUserToLocalStorage(user)

        this.router.navigate(['/chat-dashboard'])
      })

    }).catch(error=>{
      console.log(error)
      this.toastr.error("Error in signing in !!")
      this.toastr.error(error)
    })

  }

  

}
