import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../_models/';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DataService } from './data.service';
import { UserDto } from '../_models/user';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private defaultPhotoUrl = '/assets/images/man.svg';
  private _currentUser$: BehaviorSubject<User> = new BehaviorSubject(undefined);
  public currentUser$: Observable<User> = this._currentUser$.asObservable().distinctUntilChanged();
  public auth: firebase.User;
  public exit$: Subject<boolean> = new Subject();

  constructor(
    private $router: Router,
    private $afAuth: AngularFireAuth,
    private $data: DataService
  ){
    $afAuth.authState.subscribe(auth => {
      if(auth){
        console.info('Logged in...');
        this.$data.init(auth.uid).filter(u=>u!==undefined).subscribe(dbUser =>
          this._currentUser$.next(this.createNewUserFromAuth(auth, dbUser))
        );
      } else {
        //console.log('Logged out...')
        this._currentUser$.next(undefined);
        this.exit$.next(true);
      }
    })
  }

  updateUserData(data: Object){
    this.$router.navigateByUrl('view');
    this.$data.update(data);
  }


  /**
   * Собирает пользователя из данных аутентификации и полученных из БД
   * @param  {firebase.User} auth
   * @param  {UserDto} db
   */
  private createNewUserFromAuth = (auth: firebase.User, db: UserDto) => {
    this.auth = auth;
    let user;
    if(db === null){
      user = new User();
      user.uid = auth.uid;
      user.photoUrl = auth.photoURL ?  auth.photoURL : this.defaultPhotoUrl;
      user.email = auth.email;
      this.$data.add(user.toDto());
    } else {
      user = (db as User);
    }
    return user;
  }

}
