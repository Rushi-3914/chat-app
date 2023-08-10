import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ChatDashboardComponent } from './pages/chat-dashboard/chat-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent,
    title:'Home -Chat App',
  },
  {
    path:'login',
    component:LoginComponent,
    title:'Login -Chat App',
  },
  {
    path:'register',
    component:RegisterComponent,
    title:'Register -Chat App',
  },
  {
    path:'veryfy-email',
    component:VerifyEmailComponent,
    title:'VerifyEmail -Chat App',

  },
  {
    path:'chat-dashboard',
    component:ChatDashboardComponent,
    canActivate:[AuthGuard],
    title:'Chat-Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
