import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from "./calendar/calendar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;

  constructor() {
    this.title = 'amaizing calendar module for Angular';
   }

  ngOnInit() {
  }

}
