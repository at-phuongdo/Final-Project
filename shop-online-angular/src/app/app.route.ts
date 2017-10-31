import { CommentComponent } from './comment/comment.component';
import { ListItemComponent } from './home/list-item/list-item.component';
import { CategoryComponent } from './category/category.component';
import { Component, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent} from './cart/cart.component';
import { PaymentComponent} from './payment/payment.component';
import { ListProductByCategoryComponent } from './list-product-by-category/list-product-by-category.component';
import { OverviewComponent } from './category/overview/overview.component';
import { SearchComponent} from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryOrderComponent } from './history-order/history-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ShowInfoComponent } from './profile/show-info/show-info.component';
import { UpdateInfoComponent } from './profile/update-info/update-info.component';
import { ShopComponent } from './shop/shop.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: 'updatePassword/:id', component: UpdatePasswordComponent},
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: DetailsComponent,
    children: [
      { path: 'comment', component: CommentComponent}
    ]
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'category', component: CategoryComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: ':id', component: ListProductByCategoryComponent}
    ]
  },
  { path: 'search', component: SearchComponent},
  { path: 'profile', component: ProfileComponent,
    children: [
    { path: '', component: ShowInfoComponent},
    { path: 'edit', component: UpdateInfoComponent}
    ]
  },
  { path: 'history-orders', component: HistoryOrderComponent},
  { path: 'order-detail/:id', component: OrderDetailComponent},
  { path: 'shop/:id', component: ShopComponent},
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
