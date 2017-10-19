import { EventDate } from "./index";

/**
 * Класс события
 */
export class Happening {
  constructor(
    public date: EventDate,
    public participants: Array<string>,
    public title: string,
    public text: string
  ){}
}
