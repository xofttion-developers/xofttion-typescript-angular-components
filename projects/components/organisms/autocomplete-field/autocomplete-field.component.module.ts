import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteFieldComponent } from './autocomplete-field.component';
import {
  ButtonActionComponentModule,
  IconComponentModule,
  ProgressBarComponentModule
} from '../../atoms';
import { BallotComponentModule } from '../../molecules';

@NgModule({
  declarations: [AutocompleteFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BallotComponentModule,
    IconComponentModule,
    ButtonActionComponentModule,
    ProgressBarComponentModule
  ],
  exports: [AutocompleteFieldComponent]
})
export class AutocompleteFieldComponentModule {}
