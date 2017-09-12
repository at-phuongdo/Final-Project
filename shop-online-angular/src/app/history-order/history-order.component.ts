import { Component, OnInit, OnDestroy  } from '@angular/core';
import { UserService} from '../service/user/user.service';
import {OrderService} from '../service/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css']
})
export class HistoryOrderComponent implements OnInit {

  sub: any;
  user: any;
  listOrders: Array<any> = [];
  page: number;
  constructor(private userService: UserService,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.sub = this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe(data=>{
        this.user = data;
        this.orderService.getOrderByUser(localStorage.getItem('currentUser')).subscribe( orders =>{
          this.listOrders = orders;
        })
      });
    } else {
      alert('Please login to view your history order');
      this.router.navigate(['login']);
    }
  }

  detailOrder(order_id: number) {
    this.router.navigate(['order-detail',order_id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
