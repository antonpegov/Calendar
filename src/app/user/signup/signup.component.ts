import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { matchOtherValidator } from '../_validators/match-other-validator'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations:[moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  regForm: FormGroup;
  state: string = '';
  error: any;

  constructor(
    private $afAuth: AngularFireAuth,
    private $formBuilder: FormBuilder,
    private $router: Router
  ) {
    this.regForm = this.$formBuilder.group({
      email : ['',[Validators.required, Validators.email, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6),  Validators.maxLength(30)]],
      password_repeat: ['', [Validators.required, matchOtherValidator('password')]]
    });
    matchOtherValidator('sdf');
  }

  onSubmit() {
    if(this.regForm.valid){
      console.log(this.regForm.value);
      this.$afAuth.auth.createUserWithEmailAndPassword(
        this.regForm.value.email,
        this.regForm.value.password,
      ).then(
        (success) => {
          this.$router.navigate(['/view']);
        }).catch(
          (err) => {
            this.error = err;
        })
    }
  }

  ngOnInit() {
  }
}

