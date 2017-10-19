import { Happening } from "./happening";
import { BehaviorSubject } from "rxjs";
import * as moment from 'moment';

/**
 * Элемент грида
 */
export class EventDate {

    public constructor(
      public year: number,
      public month: number,
      public day: number
    ) {}

    /**
    * Сравнивает два объекта класса EventDate на идентичность
    * @param  {EventDate} date
    * @returns boolean
    */
    public static equal = (date1: EventDate, date2: EventDate): boolean => {
      if (
        date1.year === date2.year &&
        date1.month === date2.month &&
        date1.day == date2.day
      ) return true;
      return false;
    }

}
