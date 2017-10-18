import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatButton } from '@angular/material';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-cal-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {

  @ViewChild('prev') private prev: MatButton;
  @ViewChild('next') private next: MatButton;
  
  private click = new Subject(); 
  clicked$ = this.click.asObservable();
  month;
  year;
  
  constructor($service: CalendarService) { 
    $service.month$.subscribe(m => this.month = m);
    $service.year$.subscribe(y => this.year = y);
    this.clicked$.subscribe(x => $service.move(x));
  }

  ngOnInit() {
  }

}
