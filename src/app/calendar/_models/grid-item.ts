import { Happening } from "./happening";

/**
 * Элемент грида
 */
export class GridItem {
    
    dayOfWeek: string = '';
    hideDayOfWeek: boolean = true;
    thisMonth: boolean = false;
    dayOfMonth: number;
    events: Array<Happening>;
    active: boolean = false;
   
    /**
    * Универсальный конструктор
    * @param  {Partial<GridItem>} init?
    */
    public constructor(init?:Partial<GridItem>) {
        Object.assign(this, init);
    }
}
