import { Component, OnInit, OnDestroy  } from '@angular/core';
import { UserService} from '../service/user/user.service';
import {OrderService} from '../service/order/order.service';
import {AppService} from '../service/app.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  total: number;
  totalpage: any;
  current_page: number;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private appService: AppService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.sub = this.route.queryParams.subscribe( queryParams => {
        this.page = queryParams['page'] || 1;
        this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe(data=>{
          this.user = data;
          this.orderService.getOrderByUser(localStorage.getItem('currentUser'), this.page).subscribe( orders =>{
            this.listOrders = orders.orders;
            this.total = orders.meta['total'];
            this.totalpage = [];
            this.current_page = this.appService.getPager(this.total, this.page).currentPage;
            for (let i = this.appService.getPager(this.total, this.page).startPage; i <= this.appService.getPager(this.total, this.page).endPage; i++) {
              this.totalpage.push(i);
            }
            window.scrollTo(0, 0);
            console.log(this.total)
          })
        });
      });
    } else {
      alert('Please login to view your history order');
      this.router.navigate(['login']);
    }
  }

  detailOrder(order_id: number) {
    this.router.navigate(['order-detail', order_id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
