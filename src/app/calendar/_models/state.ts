import { Happening } from "./";

/**
 * Cостояние календаря для хранения в Localstorage
 */
export class State {

  constructor(
    public events: Array<Happening>,
    public year: number,
    public month: number
  ) {
  }
}
