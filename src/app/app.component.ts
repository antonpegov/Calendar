import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from "./calendar/calendar.component";
import { routerTransition } from './app-common/animations/';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;

  constructor($router: Router) {
    this.title = 'amaizing calendar module for Angular';
   }

  ngOnInit() {
  }

  /**
   * Хелпер для запуска анимации, достает из объекта outlet имя вьюшки (activatedRouteData.state)
   * @param  {} outlet
   */
  public getState = (outlet) => outlet.activatedRouteData.state;

}
