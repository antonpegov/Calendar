import { Component, OnInit } from '@angular/core';
import { Happening } from './_models/index';
import { MatDialog } from '@angular/material';
import { CalendarService } from './calendar.service';
import { NewEventDialogComponent } from './_modals/';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent implements OnInit {

  constructor(
    private $service: CalendarService,
    private $dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public onNewEventClick(): void {
    let dialogRef = this.$dialog.open(NewEventDialogComponent, {
      width: '400px',
      data:{}
    });

    dialogRef.afterClosed().subscribe((result: Happening) => {
      console.log(result);
      if(result){
        //this.grid[index].event.next(result);
        this.$service.addEvent(result);
      }
    });
  }

}
