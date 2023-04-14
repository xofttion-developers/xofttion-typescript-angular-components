import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createDOM } from '../../../utils';

@Component({
  selector: 'xft-checkbox-label',
  templateUrl: './checkbox-label.component.html',
  styleUrls: ['./checkbox-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxLabelComponent),
      multi: true
    }
  ]
})
export class CheckboxLabelComponent implements OnInit, ControlValueAccessor {
  @Input()
  public elementId?: string;

  public disabled = false;

  public value = false;

  private onChange = (_?: boolean): void => undefined;

  private onTouch = (_?: boolean): void => undefined;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-checkbox-label');
  }

  public onClickToggle(): void {
    this.value = !this.value;

    this.onTouch(this.value);
    this.onChange(this.value);
  }

  public writeValue(value?: boolean): void {
    this.value = value || false;
  }

  public registerOnChange(onChange: (value?: boolean) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: boolean) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
