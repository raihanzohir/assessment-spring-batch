import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { SessionAlertModule } from './components/widgets/widget-session-alert/session-alert/session-alert.module';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SessionAlertModule
  ],
  exports: [
    LayoutModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      } as MatFormFieldDefaultOptions
    }
  ],
  declarations: []
})
export class VexModule {
}
