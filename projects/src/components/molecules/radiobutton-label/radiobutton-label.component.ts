import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { createDOM } from 'projects/src/utils';

@Component({
  selector: 'xft-radiobutton-label',
  templateUrl: './radiobutton-label.component.html',
  styleUrls: ['./radiobutton-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonLabelComponent),
      multi: true
    }
  ]
})
export class RadiobuttonLabelComponent implements OnInit, ControlValueAccessor {
  @Input()
  public elementId?: string;

  @Input()
  public formControl?: FormControl;

  @Input()
  public value: any = null;

  protected disabled = false;

  private onChange = (_?: any): void => undefined;

  private onTouch = (_?: any): void => undefined;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-radiobutton-label');
  }

  public get checked(): boolean {
    return !!this.formControl && this.formControl.value === this.value;
  }

  public onClickToggle(): void {
    this.onTouch(this.value);
    this.onChange(this.value);
  }

  public writeValue(_: any): void {}

  public registerOnChange(onChange: (value?: any) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: any) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
