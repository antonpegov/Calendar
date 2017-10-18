import { Component, OnInit } from '@angular/core';
import { GridItem } from '../_models/';
import { CalendarService } from '../calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cal-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  private grid = new Array<GridItem>(42);
  private week = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

  constructor( private $service: CalendarService ) { 
    // первичное заполнение таблицы днями недели
    let daysInWeek = this.week.length;
    for (let i = 0; i< this.grid.length; i+=1){
      this.grid[i] = new GridItem({
        dayOfWeek: this.week[i%7],
        hideDayOfWeek: i > daysInWeek-1
      })
    };
    $service.newDate$.subscribe((date: moment.Moment) => {debugger
      // заполнить датами по сигналу от сервиса
      this.fillGrid(this.grid, date);
    })
  }

  public fillGrid = (grid: Array<GridItem>, day :moment.Moment) => {

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

}
