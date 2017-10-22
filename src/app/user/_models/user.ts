export class User {

  constructor(
    public id?: number,
    public fname?: string,
    public sname?: string,
    public mname?: string,
    public email?: string,
    public birthdate?: Date,
    public regdate?: Date,
    public photoUrl?: string
  ) {}
}
