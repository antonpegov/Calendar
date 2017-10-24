import { Component, OnInit } from '@angular/core';
import { Happening } from '../_models/';
import { CalendarService } from '../_services/calendar.service';
import { DataService } from '../_services/';

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

  constructor(
    private $service: CalendarService,
    private $data: DataService
  ) {
    this.events = $service.state.events;
    this.monthsA = $service.monthsA;
  }

  public search = (str: string) => {
    this.result = new Array<Happening>();
    if(this.$data.err){
      this.events.forEach(event => {
        if (event.title.toLowerCase().indexOf(str.toLowerCase()) > -1)
          this.result.push(event);
      })
    } else {
      // взять из базы данных
      this.$data.find(str).subscribe( res => {
        // БАМ! Оказывается Firebase не умеет производить поиск по вхождению! OMFG...
        res.forEach(event => {
          if (event.title.toLowerCase().indexOf(str.toLowerCase()) > -1)
            this.result.push(event);
        })
      });
    }


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
