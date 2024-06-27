import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionAlertComponent } from './session-alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SessionAlertComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SessionAlertModule { }
