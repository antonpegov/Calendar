import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { SearchComponent } from './search/search.component';
import { NavigateComponent } from './navigate/navigate.component';
import { BodyComponent } from './body/body.component';
import { ItemComponent } from './item/item.component';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { Ng2Webstorage, LocalStorageService, SessionStorageService} from "ngx-webstorage";

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
  ],
  providers:[
    CalendarService,
    LocalStorageService
  ]
})
export class CalendarModule { }
