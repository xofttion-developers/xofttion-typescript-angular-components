import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputFieldStatus, InputType } from '../../atoms';
import { createDOM } from 'projects/utils';

@Component({
  selector: 'xft-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextFieldComponent implements OnInit {
  @Input()
  public inputControl: FormControl;

  @Input()
  public elementId?: string;

  @Input()
  public type: InputType = 'text';

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public suffixIcon?: string;

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
    createDOM(this.ref, this.renderer).addClass('xft-text-field');
  }

  public onStatus(status: InputFieldStatus): void {
    this.status = status;
  }
}
