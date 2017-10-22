import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/';
import { User } from '../_models/';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(
    private $router: Router,
    private $user: UserService,
    //private $toolbar: AppToolbarService,
  ) { }

  public appUser: User;

  exit(){
    //this.$user.purgeAuth();
    this.$router.navigateByUrl('/').then(_=> location.reload());
  }
  ngOnInit() {
    // this.$user.currentUser$.subscribe(user => {
    //   //if (user && user.id === 'init') return;
    //   this.appUser = user;
    // });
    //this.$hardcode.setDrowerClass(this.$toolbar.getActiveRoute());
  }

}
