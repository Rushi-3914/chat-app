import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:User=new User();

  constructor(private toastr:ToastrService,private authService:AuthService){}

  formSubmited(event:SubmitEvent){
    event.preventDefault();
    console.log(this.user);

    // validating the data
    //for user
    if(this.user.name.trim()===''){
      this.toastr.error("Name is required!!")
    }
    //for email
    if(this.user.email.trim()===''){
      this.toastr.error("Email is required!!")
    }
    //for password
    if(this.user.password.trim()===''){
      this.toastr.error("Password is required!!")
    }
    //for about
    if(this.user.about.trim()===''){
      this.toastr.error("About is required!!")
    }




    // register user

    this.authService.register(this.user);
  }




  
  
}
