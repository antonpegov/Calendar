import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ReversePipe } from 'ngx-pipes/src/app/pipes/array/reverse';
import { AppCommonModule } from './app-common/app-common.module';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppCommonModule,
    BrowserModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
