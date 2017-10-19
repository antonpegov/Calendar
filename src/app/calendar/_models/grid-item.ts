import { Happening } from "./happening";
import { BehaviorSubject } from "rxjs";
import * as moment from 'moment';
import { EventDate } from "./";

/**
 * Элемент грида
 */
export class GridItem {

    dayOfWeek: string = '';
    hideDayOfWeek: boolean = true;
    thisMonth: boolean = false;
    dayOfMonth: number;
    event = new  BehaviorSubject<Happening>(undefined);
    event$ = this.event.asObservable().distinctUntilChanged();
    active: boolean = false;
    date: EventDate;
    //moment: moment.Moment;

    /**
    * Универсальный конструктор
    * @param  {Partial<GridItem>} init?
    */
    public constructor(init?:Partial<GridItem>) {
        Object.assign(this, init);
    }
}
