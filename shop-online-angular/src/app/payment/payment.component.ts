import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order/order.service';
import { CartService } from '../service/cart/cart.service';
declare let paypal: any;
declare let $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: any;
  orderItems: any;
  total: any;
  checkPaypal: boolean;
  paypal: boolean;

  constructor(
    private orderService: OrderService, 
    private cartService: CartService, 
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder,
    private toasterService: ToasterService
    ) {
    this.paymentForm = this._fb.group({
      name: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl('')
    });
    this.checkPaypal = true;
    this.paypal = false;
  }

  ngOnInit() {
    this.orderItems = this.cartService.carts;
    this.total = Math.floor(this.cartService.getTotal() / 21000);
    if (!this.orderItems[0]) {
      this.router.navigate(['/cart']);
    }
    if(!localStorage.getItem('currentUser')) {
      alert('You have to login!');
      this.router.navigate(['/login']);
    }
  }

  order(info) {
    if (this.checkPaypal) {
      if (!localStorage.getItem('currentUser')) {
        alert('You need to login');
        return false;
      }
      let data = {
        'name': info.name,
        'phone': info.phone,
        'address': info.address,
        'orderItems': this.orderItems
      }
      this.orderService.createOrder(data).subscribe((a: any) => {
        this.cartService.removeCart();
        this.toasterService.pop('success','Order success!');
        this.router.navigate(['history-orders']);
      }, (err: any) => {
        this.toasterService.pop('warning','Fail');
      });
    }
    else {
      this.toasterService.pop('warning','You have to pay before order');
    }
  }

  choosePayment(value) {
    console.log(value);
    if (value == 'paypal') {
      this.checkPaypal = false;
      this.paypal = true;
      this.initPaypal();
    }
    if (value == 'cod') {
      this.paypal = false;
    }
  }

  initPaypal() {
    $.getScript( 'https://www.paypalobjects.com/api/checkout.js', $.proxy (() => {
      var t = this.total;
      paypal.Button.render({
        env: 'sandbox', // sandbox | production
        client: {
          sandbox:    'AZ5g9OZSaXzI9sa6cFzORIdBAj7W5kPm2pA3-7ZK6X7svfnQrd65u7dCxs6fxIemfz_q-heLWD5k1abj',
          production: '<insert production client id>'
        },
        commit: true,
        payment: (data, actions) => {
          return actions.payment.create({
            payment: {
              transactions: [
              {
                amount: { total: t, currency: 'USD' }
              }
              ]
            }
          });
        },
        onAuthorize: (data, actions) => {
          return actions.payment.execute().then(() => {
            this.checkPaypal = true;
            window.alert('Payment Complete!');
          });
        }
      }, '#paypal-button-container');
    }));
  }
}
