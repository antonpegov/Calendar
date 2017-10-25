import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { EventDate, Happening } from '../_models/';
import { Observable } from 'rxjs';
import { HappeningDto } from '../_models/happening';

@Injectable()
export class DataService {

  private uid: string; // идентификатор пользователя firebase
  public err: string = 'not initialized';
  public udated$: Observable<any>;
  private eventCollection: AngularFirestoreCollection<HappeningDto>;
  private userEvents: any;

  constructor(
    private $afs: AngularFirestore
  ) {
    this.eventCollection  = $afs.collection<HappeningDto>('events');
  }

  add(event: HappeningDto, callback = null){
    event.uid = this.uid; // добавить id владельца
    this.eventCollection.add(event)
      .then(
        (success) => {
          console.log(`Added event with id "${success.id}"`);
          // сразу добавить Id-шник пока не потерялся
          this.eventCollection.doc(success.id).update({id: success.id});
          callback && callback();
        },
       (err) => console.warn(err)
      )
  }

  remove(id: string){
    if(!id) {
      console.warn('No event id for removal!')
      return;
    } else {
      this.eventCollection.doc(id).delete().then(
        (success) => console.log(`Deleted event with id "${id}"...`),
        (err) => console.warn(err)
      )
    }
  }

  all = () => this.userEvents.valueChanges()

  get = (date: EventDate, callback) => {
    console.log('GET');
    this.$afs.collection<Happening>(`events`)
      .ref
      .where('uid', '==', this.uid)
      .where('date.year', '==', date.year)
      .where('date.month', '==', date.month)
      .where('date.day', '==', date.day)
      .get().then(
        (success) => {
          console.log(success.docs.length == 0 ? `...` : 'boom!');
          callback && callback(success.docs);
        },
       (err) => console.warn(err)
      )
    }

  find = (title: string) => {
    return this.$afs.collection<Happening>(`events`, ref =>
      ref
        .where('uid', '==', this.uid)
        .orderBy('date.year')
        .orderBy('date.month')
        .limit(10)
    ).valueChanges();
  }

  init(uid: string){
    this.uid = uid;
    this.err = undefined;
    this.userEvents = this.$afs.collection<HappeningDto>('events', ref => ref.where('uid', '==', this.uid));
    return this.all();
  }


}

// export interface UserData {
//   uid?;
//   nickname?;
//   email?;
//   fname?;
//   sname?;
//   mname?;
//   events: Array<Happening>;
// }

