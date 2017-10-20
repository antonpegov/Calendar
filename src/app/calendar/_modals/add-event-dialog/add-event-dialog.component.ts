import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventDate, Happening } from '../../_models/';
import * as moment from 'moment';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
/**
 * Компонент для ввода данных нового события с заданной изначально датой
 */
export class AddEventDialogComponent implements OnInit {

  participants: string;
  title: string;
  text: string;
  date: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: EventDate,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    private $service: CalendarService
  ) {
    this.date = `${data.day} ${$service.monthsA[data.month]} ${data.year}`;
  }

  onSubmitClick(): void {
    let event = new Happening(
      this.data,
      this.participants ? this.participants.split(',') : [],
      this.title, this.text
    );
    this.dialogRef.close(event);
  }

  private makeArray(str){
    return str.splin
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
