import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, UserDto } from '../_models/user';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService  extends BehaviorSubject<UserDto>  {

  public uid: string; // идентификатор пользователя firebase
  public err: string = 'not initialized';
  private userDoc: AngularFirestoreDocument<UserDto>; // документ пользователя в firestore
  //public $ready: Subject<boolean>;

  constructor(
    private $afs: AngularFirestore
  ) {
    super(undefined);
  }

  add(user: UserDto){
    user.uid = this.uid;
    this.userDoc.set(user)
    .then(
      (success) => console.info('new user registered...'),
      (err) => console.warn(err)
    )
  }

  update(newData: Object){
    this.userDoc.update(newData).then(
      (success) => console.info('user updated...'),
      (err) => console.warn(err)
    )
  }

  remove(id: string){
  }

  init(uid: string){
    this.uid = uid;
    this.userDoc = this.$afs.doc<UserDto>(`users/${uid}`);
    this.err = undefined;
    this.userDoc.valueChanges().subscribe(user => {
      super.next(user)
    });
    return this;
  }


}
