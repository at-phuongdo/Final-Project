import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService} from '../../service/user/user.service';


@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  sub: any;
  user: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.sub = this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe(data=>{
        this.user = data;
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
