import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { HomeComponent } from './home/home.component';


const routes = [
  { path: '', component: HomeComponent  },
  { path: 'register', component: SignUpComponent },
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: 'updatePassword/:id', component: UpdatePasswordComponent},
  { path: 'login', component: LoginComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
