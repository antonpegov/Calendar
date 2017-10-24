import { Happening } from "./";

/**
 * Cостояние календаря для хранения в Localstorage
 */
export class State {

  constructor(
    public events: Array<any>,
    public year: number,
    public month: number
  ) {
  }
}
