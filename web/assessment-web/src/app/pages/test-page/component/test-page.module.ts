import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestPageRoutingModule } from './test-page-routing.module';
import { TestPageComponent } from './test-page.component';
import { UpdateEntryComponent } from './update-entry/update-entry.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    TestPageComponent,
    UpdateEntryComponent
  ],
  imports: [
    CommonModule,
    TestPageRoutingModule,
    HttpClientModule,

    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,

    PageLayoutModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatPaginatorModule

  ]
})
export class TestPageModule { }
