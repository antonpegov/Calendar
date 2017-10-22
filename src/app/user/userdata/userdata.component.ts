import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { User } from '../_models';
import { KeysPipe } from '../_pipes';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss'],
  animations:[moveIn(), fallIn(),moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class UserdataComponent implements OnInit {

  auth: any;
  state: string = '';
  error: any;
  user: User;
  //providers = LoginProviders;

  constructor(public $afAuth: AngularFireAuth, private $router: Router) {
    this.$afAuth.authState.subscribe(auth => {
      if(auth) this.auth = auth;
    });
  }
  btnSave(){

  }
  onBackClick(){
    this.$router.navigateByUrl('/view');
  }
  onLogoutClick() {
    this.$afAuth.auth.signOut();
    this.$router.navigateByUrl('/view')
  }
  ngOnInit() {
  }
}
