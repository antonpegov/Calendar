import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatButton } from '@angular/material';
import { CalendarService } from '../_services/calendar.service';

@Component({
  selector: 'app-cal-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {

  @ViewChild('prev') private prev: MatButton;
  @ViewChild('next') private next: MatButton;

  private click = new Subject();
  public clicked$ = this.click.asObservable();
  public month;
  public year;
  public todaySelected$;

  constructor(private $service: CalendarService) {
    $service.month$.subscribe(m => this.month = m);
    $service.year$.subscribe(y => this.year = y);
    this.clicked$.subscribe((x: string) => $service.move(x));
  }

  ngOnInit() {
  }

}
