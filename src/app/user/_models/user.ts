export class User {

  constructor(
    public uid?: string,
    public fname?: string,
    public sname?: string,
    public mname?: string,
    public nickname?: string,
    public email?: string,
    public birthdate?: Date,
    public regdate?: Date,
    public photoUrl?: string
  ) {}

  public toDto = (): UserDto => {
    return {
      uid: this.uid ? this.uid : '',
      fname: this.fname ? this.fname : '',
      sname: this.sname ? this.sname : '',
      mname: this.mname ? this.mname : '',
      nickname: this.nickname ? this.nickname : '',
      email: this.email ? this.email : '',
      birthdate: this.birthdate ? this.birthdate : null,
      regdate: this.regdate ? this.regdate : null,
      photoUrl: this.photoUrl ? this.photoUrl : null
    }
  }
}
export interface UserDto{
  uid?: string,
  fname?: string,
  sname?: string,
  mname?: string,
  nickname?: string,
  email?: string,
  birthdate?: Date,
  regdate?: Date,
  photoUrl?: string
}
