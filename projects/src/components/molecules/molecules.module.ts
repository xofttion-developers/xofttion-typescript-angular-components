import { NgModule } from '@angular/core';
import { CheckboxLabelComponentModule } from './checkbox-label/checkbox-label.component.module';
import { DayPickerComponentModule } from './day-picker/day-picker.component.module';
import { MoneyFieldComponentModule } from './money-field/money-field.component.module';
import { MonthPickerComponentModule } from './month-picker/month-picker.component.module';
import { RadiobuttonLabelComponentModule } from './radiobutton-label/radiobutton-label.component.module';
import { SwitchLabelComponentModule } from './switch-label/switch-label.component.module';
import { TextFieldComponentModule } from './text-field/text-field.component.module';
import { YearPickerComponentModule } from './year-picker/year-picker.component.module';

const components = [
  CheckboxLabelComponentModule,
  DayPickerComponentModule,
  MoneyFieldComponentModule,
  MonthPickerComponentModule,
  RadiobuttonLabelComponentModule,
  SwitchLabelComponentModule,
  TextFieldComponentModule,
  YearPickerComponentModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MoleculesComponentsModule {}
