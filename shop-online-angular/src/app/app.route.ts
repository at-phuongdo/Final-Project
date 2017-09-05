import { ListItemComponent } from './home/list-item/list-item.component';
import { CategoryComponent } from './category/category.component';
import { Component, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import {CartComponent} from './cart/cart.component';
import {PaymentComponent} from './payment/payment.component';
import { ListProductByCategoryComponent } from './list-product-by-category/list-product-by-category.component';
import { OverviewComponent } from './category/overview/overview.component';

const routes = [
  { path: '', component: HomeComponent  },
  { path: 'register', component: SignUpComponent },
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: 'updatePassword/:id', component: UpdatePasswordComponent},
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: DetailsComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'category', component: CategoryComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: ':id', component: ListProductByCategoryComponent}
    ]
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
