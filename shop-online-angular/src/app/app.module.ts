import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ListItemComponent } from './home/list-item/list-item.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './service/user/user.service';
import { ItemService } from './service/item/item.service';
import { HttpModule }  from '@angular/http';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: SignUpComponent },
  { path: 'home', component: HomeComponent }
]

export const routing = RouterModule.forRoot(routes) ;

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
