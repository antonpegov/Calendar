import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  public user: User;
  private _currentUser$: BehaviorSubject<User> = new BehaviorSubject(undefined);
  public currentUser$: Observable<User> = this._currentUser$.asObservable().distinctUntilChanged();

  constructor( $afAuth: AngularFireAuth){
    $afAuth.authState.subscribe(auth => {
      if(auth){
        console.info('Logged in...');
        this._currentUser$.next(this.createNewUserFromAuth(auth))
      } else {
        console.log('Logged out...')
        this._currentUser$.next(undefined);
      }
    })
  }

  private createNewUserFromAuth = (auth: firebase.User) => {
    let user = new User();
    if(auth.photoURL) user.photoUrl = auth.photoURL;
    return user;
  }
}
