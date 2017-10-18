import { Injectable } from '@angular/core';
import { Happening } from './_models/';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class CalendarService {

  events: Array<Happening>;  
  state: State;
  newDate$: BehaviorSubject<moment.Moment>;
  day$ = new BehaviorSubject<string>('init');
  month$ = new BehaviorSubject<string>('init');
  year$ = new BehaviorSubject<number>(0);

  constructor(
    private $storage: LocalStorageService,
  ) { 
    //this.events = this.$storage.retrieve(this.storeName);
    let state = this.$storage.retrieve('Calendar');
    if(state && state.year && state.month){
      this.state = state;
      this.newDate$ = new BehaviorSubject(moment([this.state.year, this.state.month, 1]));
    } else {
      // взять за основу текущую дату
      let today: moment.Moment = moment(new Date());
      this.newDate$ = new BehaviorSubject(today); 
      // инициализировать начальное состояние
      this.state = new State(new Array, today.year(), today.month());  
    }
    // после изменения даты обновить и сохранить состояние календаря
    this.newDate$.subscribe((date: moment.Moment) => {
      this.month$.next(moment.months()[date.month()]);
      this.year$.next(date.year());
      this.state.month = date.month();
      this.state.year = date.year();
      this.save();
    })
  }

  public move = (direction) => {
    if(direction === 'next'){
      this.state.month < 11
        ? this.newDate$.next(moment([this.state.year, this.state.month + 1, 1]))
        : this.newDate$.next(moment([this.state.year + 1, 0, 1]))
    } else if (direction === 'prev') {
      this.state.month > 0
        ? this.newDate$.next(moment([this.state.year, this.state.month - 1, 1]))
        : this.newDate$.next(moment([this.state.year - 1, 11, 1]))
    }
  }

  private save = () => {
    this.$storage.store('Calendar',this.state);
  }

}





/**
 * Класс состояния календаря для хранения в Localstorage
 */
export class State {
  //events: Array<Happening>;
  //year: number; 
  //month: number;
  constructor(
    public events: Array<Happening>, 
    public year: number,
    public month: number
  ) {    
  }
}
