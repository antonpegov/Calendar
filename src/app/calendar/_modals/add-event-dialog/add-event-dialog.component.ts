import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventDate, Happening } from '../../_models/';
import * as moment from 'moment';
import { CalendarService } from '../../_services/calendar.service';
import { IModalData } from '../../_models/i-modal-data';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
/**
 * Компонент для ввода данных нового события с заданной изначально датой
 */
export class AddEventDialogComponent implements OnInit {

  public title: string;
  public date: EventDate;
  public participants: string;
  public text: string;
  public dateStr: string;  // строка для отображения в шаблоне
  public mode: DialogMode;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IModalData,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    private $service: CalendarService
  ) {
    this.date = data.date;
    this.dateStr = `${data.date.day} ${$service.monthsA[data.date.month]} ${data.date.year}`;
    this.mode = data.event ? DialogMode.Edit : DialogMode.Create;
    if(this.mode === DialogMode.Edit){
      this.text = this.data.event.title;
      this.participants = this.data.event.participants.toString();
      this.title = this.data.event.title;
    }
  }

  onSubmitClick(): void {
    let event = new Happening(
      this.date,
      this.participants ? this.participants.split(',') : [],
      this.title,
      this.text,
      this.data.event && this.data.event.uid,
      this.data.event && this.data.event.id
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

/**
 * Режим диалогового окна: Редактирование/Создание
 */
enum DialogMode {Edit, Create};
