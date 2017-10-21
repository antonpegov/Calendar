import { Component, OnInit } from '@angular/core';
import { Happening } from '../_models/';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-cal-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public result: Array<Happening> = [];
  public events: Array<Happening>;
  public showResult: boolean = false;
  public searchString: string = '';
  public monthsA: Array<string>;

  constructor(private $service: CalendarService) {
    this.events = $service.state.events;
    this.monthsA = $service.monthsA;
  }

  public search = (str: string) => {
    this.result = new Array<Happening>();
    this.events.forEach(event => {
      if (event.title.toLowerCase().indexOf(str.toLowerCase()) > -1)
        this.result.push(event);
    })


  }

  public onSelect = (e,index):void => {
    this.$service.move(null, this.result[index].date);
  }

  // public show = (val: boolean): void => {
  //   this.showResult = val;
  // }

  ngOnInit() {
  }
}
