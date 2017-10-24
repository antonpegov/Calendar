import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { User } from '../_models';
import { KeysPipe } from '../_pipes';
import * as firebase from 'firebase/app';
import { UserService } from '../_services/';
import { FormGroup, FormControl, Form, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss'],
  animations:[moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class UserdataComponent implements OnInit {

  public ready: boolean = false; // костылик для торможения рендеринга
  public dataForm : FormGroup;
  public fbUser: firebase.User;
  public state: string = '';
  public error: any;
  public user: User;
  public providers = LoginProviders;

  private email; // пользовательский имейл

  constructor(
    public $afAuth: AngularFireAuth,
    private $formBuilder: FormBuilder,
    private $router: Router,
    private $user: UserService
  ) {
    // this.$afAuth.authState.subscribe(auth => {
    //   if(auth) {
    //     this.fbUser = auth;
    //   }
    // });
    this.$user.currentUser$.filter(u=>u!==undefined).subscribe((user: User) =>{
      this.ready = true;
      //this.email = user.email;
      this.dataForm = $formBuilder.group({
        nickname: [user.nickname,[Validators.maxLength(15)]],
        fname: [user.fname, [Validators.maxLength(15), Validators.pattern("[a-zA-Zа-яА-Я]*")]],
        sname: [user.sname, [Validators.maxLength(15), Validators.pattern("[a-zA-Zа-яА-Я]*")]],
        mname: [user.mname, [Validators.maxLength(15), Validators.pattern("[a-zA-Zа-яА-Я]*")]],
        email: [user.email, [Validators.email, Validators.maxLength(30),Validators.minLength(0) ]]
      })
    })

  }
  onSubmit(){
    let ctrls = this.dataForm.controls;
    let newData = <any>{};
    for (let prop in this.dataForm.controls) {
      if (!ctrls[prop].untouched) newData[prop] = ctrls[prop].value;
    }
    this.$user.updateUserData(newData);
  }

  onLogoutClick() {
    this.$afAuth.auth.signOut();
    this.$router.navigateByUrl('/view')
  }
  ngOnInit() {
  }
}

export enum LoginProviders{
  facebook,
  google,
  twitter,
  email
  //vk = 5
}
