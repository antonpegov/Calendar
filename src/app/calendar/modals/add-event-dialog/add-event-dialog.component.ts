import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventDate, Happening } from '../../_models/';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {

  participants: string;
  title: string;
  text: string;
  date: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: EventDate,
    public dialogRef: MatDialogRef<AddEventDialogComponent>
  ) {
    this.date = `${data.day} ${moment.months(data.month)} ${data.year}`;
  }

  onSubmitClick(): void {
    let event = new Happening(this.data, this.participants.split(','), this.title, this.text);
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
