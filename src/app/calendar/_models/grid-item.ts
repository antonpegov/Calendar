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
   
    /**
    * Универсальный конструктор
    * @param  {Partial<AggregatedDataSourceItem>} init?
    */
    public constructor(init?:Partial<GridItem>) {
        Object.assign(this, init);
    }
}
