import { Component, OnInit, OnDestroy } from '@angular/core';
import {OrderService} from '../service/order/order.service';
import {ItemService} from '../service/item/item.service';
import {ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderItems: Array<any> = [];
  sub: any;
  total: number;
  idOrder: number;
  status: boolean;
  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private itemService: ItemService,
    private router: Router) { }

  ngOnInit() {
    this.total =0;
    this.sub = this.route.params.subscribe( params => {
      this.idOrder = params['id']
      this.orderService.getDetailOrder(params['id']).subscribe( data => {
        if (data[0].order['status'] == 'Waiting') {
          this.status = true;
        }
        this.orderItems = data;
        this.total = this.getTotal(this.orderItems);
      });
    });
  }

  addItemToCart(product: any) {
    console.log(product);
    this.itemService.getItemById(product.item['id']).subscribe( data => {
      if (data.quantity > product.quantity) {
        this.orderItems.forEach(function (item) {
          if (item.item.id === product.item['id']) {
            item.quantity++;
          }
        });
        this.total = this.getTotal(this.orderItems);
        this.toasterService.pop('success', 'Add to cart , Complete!');
      } else {
        this.toasterService.pop('warning', 'Quantity not enough');
      }
    });
  }

  removeQuantity(product: any) {
    this.orderItems.forEach(function (item) {
      if (item.item.id === product.item['id'] && item.quantity > 1) {
        item.quantity--;
      }
    });
    this.total = this.getTotal(this.orderItems);
  }

  getTotal(orderItems: any) {
    let sum = 0;
    for (let obj of orderItems) {
      sum += obj.quantity * obj.price;
    }
    return sum;
  }

  updateOrder() {
    if (!localStorage.getItem('currentUser')) {
      alert('You need to login');
      return false;
    }
    let data = {
      'orderItems': this.orderItems
    }
    this.orderService.updateOrder(data, this.idOrder).subscribe((a: any) => {
      this.toasterService.pop('success','Update order success!');
      this.router.navigate(['history-orders']);
    }, (err: any) => {
      this.toasterService.pop('warning','Update Fail');
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
