import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './service/user/user.service';
import { HttpModule }  from '@angular/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes = [
  { path: 'register', component: SignUpComponent },
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: 'updatePassword/:id', component: UpdatePasswordComponent},
]

export const routing = RouterModule.forRoot(routes) ;

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
