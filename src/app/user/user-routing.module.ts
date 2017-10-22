import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuardService } from './_services/';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { UserdataComponent } from './userdata/userdata.component';
import { UserComponent } from './user.component';

const _routes: Routes = [{
  path: 'user',
  //redirectTo: 'login', pathMatch: 'full' },
  component: UserComponent,
  data: {
    state: 'user',
    title: 'Пользователь',
    icon: 'user',
    order: 2,
    menu: false
},
  children:[
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuardService] },
    { path: 'userdata', component: UserdataComponent, canActivate: [AuthGuardService] }
  ]
}]

// const routes: ModuleWithProviders = RouterModule.forChild(_routes);

@NgModule({
  imports: [RouterModule.forChild(_routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
