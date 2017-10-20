import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
//import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ReversePipe } from 'ngx-pipes/src/app/pipes/array/reverse';
import { AppCommonModule } from './app-common/app-common.module';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarComponent } from './calendar/calendar.component';
import { AddEventDialogComponent, NewEventDialogComponent } from './calendar/_modals/';
import { SelectModule } from 'ng2-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppCommonModule,
    BrowserModule,
    SelectModule,
    CalendarModule
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
