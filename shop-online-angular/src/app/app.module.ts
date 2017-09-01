import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListItemComponent } from './home/list-item/list-item.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './service/user/user.service';
import { ItemService } from './service/item/item.service';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { routing } from './app.route';
import { DetailsComponent } from './details/details.component';
import { LogoutComponent } from './logout/logout.component';
import {CartService} from './service/cart/cart.service';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    SignUpComponent,
    HomeComponent,
    LoginComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    DetailsComponent,
    LogoutComponent,
    CartComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    routing,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UserService,
    ItemService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
