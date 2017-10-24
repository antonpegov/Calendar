import { EventDate } from "./index";

/**
 * Класс события
 */
export class Happening {
  constructor(
    public date: EventDate,
    public participants: Array<string>,
    public title: string,
    public text: string,
    public uid?: string,
    public id?: string
  ){}

  /**
   * Переводит в объект, приемлимый для firestore
   * @returns HappeningDto
   */
  public toDto = (): HappeningDto => {
    return {
      date: {
        year: this.date.year,
        month: this.date.month,
        day: this.date.day
      },
      participants: this.participants ? this.participants : [],
      title: this.title,
      text: this.text ? this.text : '',
      uid: this.uid,
      id: this.id ? this.id : null
    }
  }

}
export interface HappeningDto {
  date: {
    year: number,
    month: number,
    day: number
  },
  participants: Array<string>,
  title: string,
  text: string,
  uid?: string,
  id?: string
}

