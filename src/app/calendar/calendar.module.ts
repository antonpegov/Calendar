import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { SearchComponent } from './search/search.component';
import { NavigateComponent } from './navigate/navigate.component';
import { BodyComponent} from './body/body.component';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './_services/calendar.service';
import { Ng2Webstorage, LocalStorageService, SessionStorageService} from "ngx-webstorage";
import { AddEventDialogComponent, NewEventDialogComponent } from './_modals/';
import { MatDialog } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { UserModule } from '../user/user.module';
import { DataService } from './_services/';



@NgModule({
  imports: [
    AppCommonModule,
    FormsModule,
    NgPipesModule,
    UserModule,
  ],
  declarations: [
    SearchComponent,
    NavigateComponent,
    BodyComponent,
    CalendarComponent,
    AddEventDialogComponent,
    NewEventDialogComponent
  ],
  exports: [
    CalendarComponent
  ],
  providers:[
    MatDialog,
    DataService,
    CalendarService,
    LocalStorageService,
  ]
})
export class CalendarModule { }
