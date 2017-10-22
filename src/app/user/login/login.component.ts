import { Component, OnInit, HostBinding} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';
import { AuthProvider } from 'firebase/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  provider: firebase.auth.AuthProvider;
  okUrl: string = '/view';

  constructor( private $afAuth: AngularFireAuth, private $router: Router,  ) {
    this.$afAuth.authState.subscribe(auth => {
      if(auth){
        this.$router.navigateByUrl(this.okUrl);
      }
    });
  }

  loginGoogle() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.$afAuth.auth.signInWithPopup(this.provider).then(
      (success) => {
        this.$router.navigateByUrl(this.okUrl);
      }).catch(
        (err) => {
          this.error = err;
      })
  }

  loginFacebook() {
    this.provider = new firebase.auth.FacebookAuthProvider();
    this.$afAuth.auth.signInWithPopup(this.provider).then(
      (success) => {
        this.$router.navigateByUrl(this.okUrl);
      }).catch(
        (err) => {
          this.error = err;
      })
  }

  loginTwitter() {
    this.provider = new firebase.auth.TwitterAuthProvider();
    this.$afAuth.auth.signInWithPopup(this.provider).then(
      (success) => {
        this.$router.navigateByUrl(this.okUrl);
      }).catch(
        (err) => {
          this.error = err;
      })
  }

  ngOnInit() {
  }

}
