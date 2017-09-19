import { Component, OnInit } from '@angular/core';
import { ShopService } from '../service/shop/shop.service';
import { ActivatedRoute } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AppService } from '../service/app.service';
import { CartService } from '../service/cart/cart.service';
declare var google: any;
declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shopInfo: any;
  title: string = 'My first AGM project';
  lat: number = 16.099361; 
  lng: number = 108.100361;
  total: number;
  totalpage: any;
  current_page: number;
  page: number;

  constructor(private shopService: ShopService,
    private route: ActivatedRoute,
    private appService: AppService,
    private cartService: CartService) { }

  ngOnInit() {
    this.route.queryParams.subscribe( queryParams => {
      this.page = +queryParams['page'] || 1;
      this.route.params.subscribe( params => {
        this.shopService.getShopById(params['id']).subscribe((data: any) => {
          this.shopInfo = data.shop;
          this.total = data.meta['total'];
          this.totalpage = [];
          this.current_page = this.appService.getPager(this.total, this.page).currentPage;
          for (let i = this.appService.getPager(this.total, this.page).startPage; i <= this.appService.getPager(this.total, this.page).endPage; i++) {
            this.totalpage.push(i);
          }
          window.scrollTo(0, 0);
          $(document).ready( () => {
            var geocoder = new google.maps.Geocoder();
            console.log(geocoder);
            geocoder.geocode( {"address": this.shopInfo.address},(results, status) => 
            {
              console.log("a")
              if (status == google.maps.GeocoderStatus.OK) 
              {
                this.lat = results[0].geometry.location.lat();
                this.lng = results[0].geometry.location.lng();
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
          })
        });
      })
    });
  }

  addItemToCart(item: any) {
    this.cartService.checkQuantity(item);
  }
}
