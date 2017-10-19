import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgPipesModule } from 'ngx-pipes';
// Google Material
import {
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    FlexLayoutModule,
    NgPipesModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    CommonModule
]
})
export class AppCommonModule { }
