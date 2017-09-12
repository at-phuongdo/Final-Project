import { Component, OnInit, OnDestroy } from '@angular/core';
import {OrderService} from '../service/order/order.service';
import {ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderItems: Array<any> = [];
  sub: any;
  total: number;
  constructor(private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.total = 0;
    this.sub = this.route.params.subscribe( params => {
      this.orderService.getDetailOrder(params['id']).subscribe( data => {
        this.orderItems = data;
        console.log(this.orderItems[0]);
        for (let obj of this.orderItems) {
          this.total += obj.quantity * obj.price; 
        }
      });
    });
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
