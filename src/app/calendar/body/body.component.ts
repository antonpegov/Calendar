import { Component, OnInit, QueryList, ViewChildren, ElementRef, Inject } from '@angular/core';
import {MatGridTile, MatDialog } from '@angular/material';
import { GridItem } from '../_models/';
import { CalendarService } from '../calendar.service';
import { Subject, Observable } from 'rxjs';
import * as moment from 'moment';
import { AddEventDialogComponent } from '../modals/add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-cal-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @ViewChildren(MatGridTile) 
  private _tiles: QueryList<ElementRef>;
  private grid = new Array<GridItem>(42);
  private gridElementsArray: Array<ElementRef>;
  private activeCellIndex: number;
  private week = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
  private click = new Subject(); 
  public clicked$ = this.click.asObservable();

  constructor( 
    private $service: CalendarService, 
    private $dialog: MatDialog
  ) { 
    // первичное заполнение таблицы днями недели
    let daysInWeek = this.week.length;
    for (let i = 0; i< this.grid.length; i+=1){
      this.grid[i] = new GridItem({
        dayOfWeek: this.week[i%7],
        hideDayOfWeek: i > daysInWeek-1
      })
    };
    // заполнить датами по сигналу от сервиса
    $service.newDate$.subscribe((date: moment.Moment) => {
      this.fillGrid(this.grid, date);
    })
    // подписаться на события грида
    let self = this;
    let test = 'TEST'
    this.clicked$.subscribe((index: number) => {
      //let el = this.gridElementsArray[index];
      //let old = this.gridElementsArray[this.activeCellIndex];
      //(el as any)._element.nativeElement.classList.add('selected');
      //(old as any)._element.nativeElement.classList.remove('selected');
      this.setActiveCell(index);
    })
  }

  public onAddEventClick(e): void {
    console.log(e);
    let dialogRef = this.$dialog.open(AddEventDialogComponent, {
      width: '250px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.info(result);
    });
  }

  private setActiveCell = (i) => {
    if (this.activeCellIndex) this.grid[this.activeCellIndex].active = false;
    this.activeCellIndex = i;
    this.grid[this.activeCellIndex].active = true;
  }
  private fillGrid = (grid: Array<GridItem>, day :moment.Moment) => {

    let firstDayIndex = day.date(1).isoWeekday() - 1; // определить день недели первого элемента
    let prevMonth = moment(day.month() - 1);
    let nextMonth = moment(day.month() + 1);
    
    grid.forEach((item: GridItem, index: number) => {
      if (index >= firstDayIndex && index < firstDayIndex + day.daysInMonth()){
        item.dayOfMonth = index - firstDayIndex + 1;
        item.thisMonth = true;
      } else { 
        // заполнить видимые дни предыдущего и следующего месяцев
        item.dayOfMonth = index < firstDayIndex 
          ? prevMonth.daysInMonth() - firstDayIndex + index + 1
          : 1 + index - day.daysInMonth() - firstDayIndex;
      }
    });
    // for (var i = 0; i < firstDayIndex, count = 0; i >=0 ; i--){
    //   grid[i].dayOfMonth = prevMonth.daysInMonth()-count;
    //   count++;
    // }
  }
  ngOnInit() {
  }

  ngAfterViewInit(){
    this.gridElementsArray = this._tiles.toArray();
  }

}