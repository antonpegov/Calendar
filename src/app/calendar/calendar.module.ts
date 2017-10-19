import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { SearchComponent } from './search/search.component';
import { NavigateComponent } from './navigate/navigate.component';
import { BodyComponent} from './body/body.component';
import { ItemComponent } from './item/item.component';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { Ng2Webstorage, LocalStorageService, SessionStorageService} from "ngx-webstorage";
import { AddEventDialogComponent } from './modals/add-event-dialog/add-event-dialog.component';
import { MatDialog } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AppCommonModule,
    FormsModule
  ],
  declarations: [
    SearchComponent, 
    NavigateComponent, 
    BodyComponent, 
    ItemComponent,
    CalendarComponent,
    AddEventDialogComponent
  ],
  exports: [
    CalendarComponent,
    AddEventDialogComponent
  ],
  providers:[
    MatDialog,
    CalendarService,
    LocalStorageService
  ]
})
export class CalendarModule { }
