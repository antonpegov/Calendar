import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { UserdataComponent } from './userdata/userdata.component';
import { AuthGuardService, UserService } from './_services/';
import { AngularFireModule } from 'angularfire2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysPipe, InitialPipe, CapitalizePipe } from './_pipes/';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';

export const firebaseConfig = {
  apiKey: "AIzaSyDMUjrohj0dqWEM3mqU7VXPkRLPdJc8rL8",
  authDomain: "mynicecalendar.firebaseapp.com",
  databaseURL: "https://mynicecalendar.firebaseio.com",
  projectId: "mynicecalendar",
  storageBucket: "mynicecalendar.appspot.com",
  messagingSenderId: "422947812747"
};

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    CapitalizePipe,
    InitialPipe,
    KeysPipe,
    //AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    UserdataComponent,
    UserWidgetComponent,
    UserComponent
  ],
  exports: [
    UserWidgetComponent
  ],
  providers: [
    //UserService, не создаём провайдер, передав эту функцию верхнему модклю
    AngularFireAuth,
    AuthGuardService
  ]
})
export class UserModule {
  /**
   * Метод для указания, инжекторы для каких сервисов данного модуля
   * не нужно будет создать в модулях его импортирующих.
   * @returns ModuleWithProviders
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [UserService]
    };
  }

}
