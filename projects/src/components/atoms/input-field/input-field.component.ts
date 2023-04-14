import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors
} from '@angular/forms';
import { createDOM } from '../../../utils';

const MSG_ERROR_DEFAULT = 'Campo no cumple validación';

export type InputType = 'text' | 'number' | 'password' | 'email';

export interface InputFieldStatus {
  active: boolean;
  error: boolean;
  disabled: boolean;
  msgError?: string;
}

@Component({
  selector: 'xft-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input()
  public elementId?: string;

  @Input()
  public formControl?: FormControl;

  @Input()
  public type: InputType = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Output()
  public status: EventEmitter<InputFieldStatus>;

  public statusField: InputFieldStatus;

  public input = '';

  private onChange = (_?: string): void => undefined;

  private onTouch = (_?: string): void => undefined;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.statusField = {
      active: false,
      disabled: false,
      error: false,
      msgError: MSG_ERROR_DEFAULT
    };

    this.status = new EventEmitter();
  }

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-input-field');
  }

  public onFocus(): void {
    this.statusField.active = true;

    this.status.emit(this.statusField);
  }

  public onBlur(): void {
    this.statusField.active = false;

    this.status.emit(this.statusField);

    this.checkErrorStatus();
  }

  public onInput(event: Event): void {
    const inputTarget = event.target as HTMLInputElement;

    this.input = inputTarget.value;

    this.onTouch(inputTarget.value);
    this.onChange(inputTarget.value);

    if (this.statusField.error) {
      this.checkErrorStatus();
    }
  }

  private checkErrorStatus(): void {
    this.statusField.error = this.formControl?.invalid || false;

    if (this.statusField.error && this.formControl?.errors) {
      this.changeMsgError(this.formControl.errors);
    }

    this.status.emit(this.statusField);
  }

  private changeMsgError(errors: ValidationErrors): void {
    const [error] = Object.keys(errors).map((key) => errors[key]);

    let msgError = MSG_ERROR_DEFAULT;

    if (error) {
      msgError = error.message || MSG_ERROR_DEFAULT;
    }

    this.statusField.msgError = msgError;
  }

  public writeValue(value?: string): void {
    this.input = value || '';
  }

  public registerOnChange(onChange: (value?: string) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: string) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.statusField.disabled = disabled;

    this.status.emit(this.statusField);
  }
}
