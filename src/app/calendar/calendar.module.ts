import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { SearchComponent } from './search/search.component';
import { NavigateComponent } from './navigate/navigate.component';
import { BodyComponent } from './body/body.component';
import { ItemComponent } from './item/item.component';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    AppCommonModule
  ],
  declarations: [
    SearchComponent, 
    NavigateComponent, 
    BodyComponent, 
    ItemComponent,
    CalendarComponent
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
