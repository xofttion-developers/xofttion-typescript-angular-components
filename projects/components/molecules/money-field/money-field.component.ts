import { formatCurrency } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputFieldStatus } from '../../atoms';
import { createDOM } from '../../../utils';

@Component({
  selector: 'xft-money-field',
  templateUrl: './money-field.component.html',
  styleUrls: ['./money-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoneyFieldComponent implements OnInit, OnDestroy {
  @Input()
  public inputControl: FormControl;

  @Input()
  public elementId?: string;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public enabled = true;

  @Input()
  public currencyCode = 'COP';

  @Input()
  public symbol = '';

  @Input()
  public locale = 'en-US';

  @Input()
  public digits = '.2-2';

  @Input()
  public suffixIcon?: string;

  private subscription?: Subscription;

  protected value = '';

  protected status: InputFieldStatus;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.status = {
      active: false,
      disabled: false,
      error: false,
      msgError: ''
    };

    this.inputControl = new FormControl(null);
  }

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-money-field');

    this.setValueFormat(this.inputControl.value);

    this.subscription = this.inputControl.valueChanges.subscribe((value) =>
      this.setValueFormat(value)
    );
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public onStatus(status: InputFieldStatus): void {
    this.status = status;
  }

  private setValueFormat(value: string): void {
    this.value = value
      ? formatCurrency(
          +value,
          this.locale,
          this.symbol,
          this.currencyCode,
          this.digits
        )
      : '';
  }
}
