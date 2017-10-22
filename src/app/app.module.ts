import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
//import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ReversePipe } from 'ngx-pipes/src/app/pipes/array/reverse';
import { AppCommonModule } from './app-common/app-common.module';
import { UserModule } from './user/user.module';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarComponent } from './calendar/calendar.component';
import { AddEventDialogComponent, NewEventDialogComponent } from './calendar/_modals/';
import { AppRoutingModule } from './app-routing.module';
import { CalendarRoutingModule } from './calendar/calendar-routing.module';
import { UserRoutingModule } from './user/user-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppCommonModule,
    AppRoutingModule,
    CalendarModule,
    CalendarRoutingModule,
    UserModule.forRoot(),
    UserRoutingModule
  ],
  entryComponents: [
    AddEventDialogComponent,
    NewEventDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
