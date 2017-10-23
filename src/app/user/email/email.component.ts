import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations:[moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  public loginForm: FormGroup;
  public state: string = '';
  public error: any;

  constructor(
    private $formBuilder: FormBuilder,
    public $afAuth: AngularFireAuth,
    private $router: Router
  ) {
    this.loginForm = $formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
    this.$afAuth.authState.subscribe(auth => {
      if(auth){
        this.$router.navigateByUrl('/user/userdata');
      }
    });
  }
  onSubmit() {
    if(this.loginForm.valid){
      //console.log(formData.value)
      this.$afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(
        (success) => {
          this.$router.navigate(['/view']);
          this.error = null;
        }).catch(
          (err) => {
            this.error = err;
        })
    }
  }
  ngOnInit() {
  }
}
