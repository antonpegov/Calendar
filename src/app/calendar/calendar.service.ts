import { Injectable } from '@angular/core';
import { Happening, GridItem, EventDate } from './_models/';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/ru';

@Injectable()
export class CalendarService {

  private state: State;
  public newDate$: BehaviorSubject<moment.Moment>;
  public day$ = new BehaviorSubject<string>('init');
  public month$ = new BehaviorSubject<string>('init');
  public year$ = new BehaviorSubject<number>(0);
  public monthsA = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');

  constructor(
    private $storage: LocalStorageService,
  ) {
    let state = this.$storage.retrieve('Calendar');

    if(state && state.year && state.month){
      this.state = state;
      this.newDate$ = new BehaviorSubject(moment([this.state.year, this.state.month, 1]));
    } else {
      // взять за основу текущую дату
      let today: moment.Moment = moment(new Date());
      this.newDate$ = new BehaviorSubject(today);
      // инициализировать начальное состояние
      this.state = new State(this.mock, today.year(), today.month());
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

  public chechForEvent = (item: GridItem): void => {
    item.event.next(undefined); // очистить прежнее событие
    this.state.events && this.state.events.forEach((event: Happening) => {
        if(EventDate.equal(item.date, event.date)){
          console.info('Boom!');
          item.event.next(event);
        }
    });
  };

  public addEvent = (event: Happening): void => {debugger
    this.state.events.push(event);
    this.save();
  }

  public removeEvent = (date: EventDate): void => {
    let i: number;
    for (let {item,index} of this.state.events.map((item, index) => ({ item, index }))){
      if (EventDate.equal(item.date, date)){
        i = index;
        break;
      }
    }
    this.state.events.splice(i,1);
    this.save();
  }

  private save = (): void => {
    this.$storage.store('Calendar',this.state);
  }

  private mock: Array<Happening> = [
    {
      date: {
        year: 2017,
        month: 9,
        day: 7
      },
      participants: ['Anton','Andrey'],
      title: 'Mega party',
      text: 'bla-bla-bla bla-bla-bla bla-bla-bla bla-bla-bla',
    },{
      date: {
        year: 2017,
        month: 9,
        day: 5
      },
      participants: ['Anton','Sergey'],
      title: 'Mega rave',
      text: 'bla-bla-bla bla-bla-bla bla-bla-bla bla-bla-bla',
    },{
      date: {
        year: 2017,
        month: 8,
        day: 25
      },
      participants: ['Ivan','Sergey'],
      title: 'Get drunk',
      text: 'bla-bla-bla bla-bla-bla bla-bla-bla bla-bla-bla',
    },{
      date: {
        year: 2017,
        month: 10,
        day: 15
      },
      participants: ['Anton','Slava'],
      title: 'Fishing',
      text: 'bla-bla-bla bla-bla-bla bla-bla-bla bla-bla-bla',
    },
  ]
}





/**
 * Cостояние календаря для хранения в Localstorage
 */
export class State {

  constructor(
    public events: Array<Happening>,
    public year: number,
    public month: number
  ) {
  }
}
