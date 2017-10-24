import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventDate, Happening } from '../../_models/';
import * as moment from 'moment';
import { CalendarService } from '../../_services/calendar.service';
import {NgControl, Validators, FormBuilder, NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.scss']
})
/**
 * Компонент для ввода данных нового события без заданной изначально даты
 */
export class NewEventDialogComponent implements OnInit {

  public participants: string;
  public title: string;
  public text: string;
  public day: number;
  public month: number;
  public year: number;
  public months: Array<string> = moment.months();
  public m: any;

  @ViewChild(NgForm)
  private form: NgForm;

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
