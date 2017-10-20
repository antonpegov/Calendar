import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventDate, Happening } from '../../_models/';
import * as moment from 'moment';
import { CalendarService } from '../../calendar.service';
import {NgControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.scss']
})
/**
 * Компонент для ввода данных нового события без заданной изначально даты
 */
export class NewEventDialogComponent implements OnInit {

  participants: string;
  title: string;
  text: string;
  day: number;
  month: number;
  year: number;
  months: Array<string> = moment.months();
  m;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<NewEventDialogComponent>,
    private $service: CalendarService
  ) {
    this.m = moment;
  }

  onChange(changed){
    if(!changed) return;
    if(changed === 'year'){
      this.month = undefined;
      this.day = undefined;
    } else {
      this.day = 1;
    }
  }

  onSubmitClick(): void {
    let event = new Happening(
      new EventDate(Number(this.year),Number(this.month),Number(this.day)),
      this.participants ? this.participants.split(',') : [],
      this.title,
      this.text
    );
    this.dialogRef.close(event);
  }

  public range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

  // private makeArray(str){
  //   return str.splin
  // }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
