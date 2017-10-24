import { Injectable } from '@angular/core';
import { Happening, GridItem, EventDate, State } from '../_models/';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/ru';
import { DataService } from './data.service';
import { UserService } from '../../user/_services/';
import { HappeningDto } from '../_models/happening';

@Injectable()
export class CalendarService {

  public state: State;
  public newDate$: BehaviorSubject<moment.Moment>;
  public day$ = new BehaviorSubject<number>(undefined);
  public month$ = new BehaviorSubject<string>('init');
  public year$ = new BehaviorSubject<number>(0);
  public monthsA = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');

  constructor(
    private $storage: LocalStorageService,
    private $data: DataService,
    private $user: UserService
  ) {
    // #region Работа с базой данных
    $user.exit$.subscribe(e => { $data.err='loged out'; this.updateView()}); // обновиться после логаута
    $user.currentUser$.filter(u=>u!==undefined).subscribe(user =>{
      $data.init($user.auth.uid).subscribe(userEvents => {
        this.state.events = userEvents;
        this.updateView();
      })
    })


    // #endregion
    // #region Работа с локальным хранилищем
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
    // #endregion
  }

  /**
   * Переключить месяц
   * @param  {string} direction - next/prev/today
   * @returns void
   */
  public move = (direction: string, date?: EventDate):void => {
    if(direction === 'next'){
      this.state.month < 11
        ? this.newDate$.next(moment([this.state.year, this.state.month + 1, 1]))
        : this.newDate$.next(moment([this.state.year + 1, 0, 1]))
    } else if (direction === 'prev') {
      this.state.month > 0
        ? this.newDate$.next(moment([this.state.year, this.state.month - 1, 1]))
        : this.newDate$.next(moment([this.state.year - 1, 11, 1]))
    } else if (date) {
      this.day$.next(date.day);
      this.newDate$.next(moment([date.year, date.month, 1]))
    } else {
      let today = moment(new Date);
      this.day$.next(today.date());
      this.newDate$.next(today);
    }
  }

  /**
   * Проверяет, есть ли событие на указанную в Гридайтеме дату, получает и вставляет его.
   * @param  {GridItem} item
   * @returns void
   */
  public checkForEvent = (item: GridItem): void => {
    item.event.next(undefined); // очистить прежнее событие
    if(true){//this.$data.err){
      // достать событие из локального хранилища
      this.state.events && this.state.events.forEach((event: Happening) => {
          if(EventDate.equal(item.date, event.date)){
            item.event.next(event);
          }
      });
    } else {
      // получить событие из базы данных
      // this.$data.get(item.date, event => {
      //   item.event.next(event.length > 0 ? event[0] : undefined)
      // });
      //TODO: Этот код вешает firebase.
      // Видимо большое количество составных запросов подпадает под некие
      // ограничения для бесплатных приложений.
    }
  };

  public addEvent = (event: Happening): void => {
    if(this.$data.err){
      this.state.events.push(event);
      this.save();
      this.updateView();
    } else {
      this.$data.add(event.toDto(), this.updateView);
    }
  }

  public updateView = () => {
    this.newDate$.next(moment([this.state.year, this.state.month,1]))
  };

  public removeEvent = (event: Happening): void => {
    if(!this.$data.err){
      this.$data.remove(event.id);
    } else {
      let i: number;
      for (let {item,index} of this.state.events.map((item, index) => ({ item, index }))){
        if (EventDate.equal(item.date, event.date)){
          i = index;
          break;
        }
      }
      this.state.events.splice(i,1);
      this.save();
    }
  }

  public getEvents = (): Array<Happening> => {
      return this.state.events;
  }

  /**
   * Пост-обработчик, подчищающий костыли
   */
  public gridRendered = (): void => this.day$.next(undefined);

  private save = (): void => {
    this.$storage.store('Calendar',this.state);
  }

  private mock: Array<HappeningDto> = [
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
