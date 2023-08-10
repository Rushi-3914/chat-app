import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireDatabaseModule} from '@angular/fire/compat/database'
import {AngularFireAuthModule} from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment.development';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChatDashboardComponent } from './pages/chat-dashboard/chat-dashboard.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatDashboardComponent,
    VerifyEmailComponent,
    HomeComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-left'
}), // ToastrModule added
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
