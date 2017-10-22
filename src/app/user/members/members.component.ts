import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { Observable } from 'rxjs';
//import * as firebase from "firebase";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations:[moveIn(), fallIn(),moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {
    auth: any;
    state: string = '';
    error: any;
  constructor( public $afAuth: AngularFireAuth, private $router: Router) {
    // Observable.fromPromise(this.$afAuth.auth.signInWithCredential()).subscribe(auth => {
    //   if(auth){
    //     this.auth = auth;
    //   }
    // });
  }
  userData() {
    this.$router.navigateByUrl('/userdata')

  }
  logout() {
    this.$afAuth.auth.signOut();
    this.$router.navigateByUrl('/login')
    console.log('Signed Out...');
  }
  ngOnInit() {
  }

}
