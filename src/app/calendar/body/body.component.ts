import { Component, OnInit, QueryList, ViewChildren, ElementRef, Inject } from '@angular/core';
import {MatGridTile, MatDialog } from '@angular/material';
import { GridItem, EventDate, Happening } from '../_models/';
import { CalendarService } from '../_services/calendar.service';
import { Subject, Observable } from 'rxjs';
import * as moment from 'moment';
import { AddEventDialogComponent } from '../_modals/';

@Component({
  selector: 'app-cal-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @ViewChildren(MatGridTile)
  private _tiles: QueryList<ElementRef>;
  private grid: Array<GridItem> = new Array<GridItem>(42);
  private gridElementsArray: Array<ElementRef>;
  private activeCellIndex: number;
  private week: Array<string> = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
  private click: Subject<any> = new Subject();
  public clicked$: Observable<any> = this.click.asObservable();

  constructor(
    private $service: CalendarService,
    private $dialog: MatDialog
  ) {
    // первичное заполнение таблицы днями недели
    let daysInWeek = this.week.length;
    for (let i = 0; i< this.grid.length; i+=1){
      this.grid[i] = new GridItem({
        dayOfWeek: this.week[i%7],
        hideDayOfWeek: i > daysInWeek-1,
      })
    };
    // заполнить датами по сигналу от сервиса
    $service.newDate$.subscribe((date: moment.Moment) => {
      this.fillGrid(date);
    })
    // подписаться на события грида
    this.clicked$.subscribe((index: number) => {
      this.setActiveCell(index);
    })
  }
  /**
   * Удалить событие
   * @param  {} e
   * @param  {} i
   */
  public onRemoveEventClick = (e, i) => {
    let event = this.grid[i];
    this.$service.removeEvent(this.grid[i].event.value);
    this.grid[i].event.next(undefined);
  }
  /**
   * Редактировать событие
   * @param  {} e
   * @param  {} index
   * @returns void
   */
  public onEditEventClick = (e, index): void => {debugger
    let event = this.grid[index].event.value;
    let date = this.grid[index].date;
    let dialogRef = this.$dialog.open(AddEventDialogComponent, {
      width: '400px',
      data: {date: date, event: event}
    });

    dialogRef.afterClosed().subscribe((result: Happening) => {
      if(result){
        this.grid[index].event.next(result);
        this.$service.removeEvent(result);
        this.$service.addEvent(result);
      }
    });
  }
  /**
   * Добавить событие
   * @param  {} e
   * @param  {} index
   * @returns void
   */
  public onAddEventClick = (e, index): void => {
    let dialogRef = this.$dialog.open(AddEventDialogComponent, {
      width: '400px',
      data: {date: this.grid[index].date, event: null }
    });

    dialogRef.afterClosed().subscribe((result: Happening) => {
      if(result){
        this.grid[index].event.next(result);
        this.$service.addEvent(result);
      }
    });
  }

  private setActiveCell = (i) => {
    if (this.activeCellIndex) this.grid[this.activeCellIndex].active = false;
    this.activeCellIndex = i;
    this.grid[this.activeCellIndex].active = true;
  }
  /**
   * Заполняет массив GridItem данными
   */
  private fillGrid = (day :moment.Moment) => {

    const firstDayIndex = day.date(1).isoWeekday() - 1; // определить день недели первого элемента
    const thisMonth = day.month();
    const thisYear = day.year();
    // вспомогательные параметры для инициализации ячеек не текущего месяца:
    let prevMonth, nextMonth, prevYear, nextYear;
    if (thisMonth === 0) {
      // первый месяц года
      prevMonth = 11;
      prevYear = thisYear - 1;
      nextMonth = thisMonth;
      nextYear = thisYear;
    } else if (thisMonth === 11) {
      // последний месяц года
      prevMonth = thisMonth;
      prevYear = thisYear;
      nextMonth = 0;
      nextYear = thisYear+1;
    } else {
      prevMonth = thisMonth-1;
      prevYear = thisYear;
      nextMonth = thisMonth+1;
      nextYear = thisYear;
    }

    this.grid.forEach((item: GridItem, index: number) => {
      let month = thisMonth;
      let year = thisYear;
      item.thisMonth = false;
      item.active = false;
      if (index >= firstDayIndex && index < firstDayIndex + day.daysInMonth()){
        item.dayOfMonth = index - firstDayIndex + 1;
        item.thisMonth = true;
        if (item.dayOfMonth === this.$service.day$.value) {
          item.active = true;
          this.activeCellIndex = index;
        }
      } else if (index < firstDayIndex){
        // заполнить видимые дни предыдущего месяца
        year = prevYear === thisYear ? thisYear : prevYear;
        month = prevMonth;
        item.dayOfMonth =  moment([year, month,1]).daysInMonth() - firstDayIndex + index + 1;
      } else if (index >= firstDayIndex + day.daysInMonth()){
        // заполнить видимые дни следующего месяца
        year = nextYear === thisYear ? thisYear : nextYear;
        month = nextMonth;
        item.dayOfMonth = 1 + index - day.daysInMonth() - firstDayIndex;
      } else {
        console.error('Осталась не обрабьботанная дата!');
      }
      item.date = new EventDate(year, month, item.dayOfMonth)
      this.$service.checkForEvent(item);
    });
    this.$service.gridRendered();
  }
  ngOnInit() {
  }

  ngAfterViewInit(){
    this.gridElementsArray = this._tiles.toArray();
  }

}
