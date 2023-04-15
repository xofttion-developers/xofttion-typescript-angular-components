import { NgModule } from '@angular/core';
import { DateFieldComponentModule } from './date-field/date-field.component.module';
import { DatePickerComponentModule } from './date-picker/date-picker.component.module';
import { ModalComponentModule } from './modal/modal.component.module';

const components = [
  DateFieldComponentModule,
  DatePickerComponentModule,
  ModalComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class OrganismsComponentsModule {}
