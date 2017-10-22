import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
//import { CalendarAddedComponent } from './calendar-added/calendar-added.component';
//import { CalendarLoadedComponent } from './calendar-loaded/calendar-loaded.component';
//import { CalendarSettingsComponent } from './calendar-settings/calendar-settings.component';

const routes: Routes = [{
    path: 'view',
    component: CalendarComponent,
    data: {
        state: 'calendar_view',
        title: 'Календарь',
        icon: 'calendar_view',
        order: 1,
        menu: true
    },
    children: [
        //{ path: 'loaded', component: CalendarLoadedComponent, outlet: 'view'},
        //{ path: 'added', component: CalendarAddedComponent},
        //{ path: 'settings', component: CalendarSettingsComponent}
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }
