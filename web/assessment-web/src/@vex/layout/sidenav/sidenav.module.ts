import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavItemModule } from './sidenav-item/sidenav-item.module';
import { ScrollbarModule } from '../../components/scrollbar/scrollbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    SidenavItemModule,
    ScrollbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule

  ],
  exports: [SidenavComponent]
})
export class SidenavModule {
}
