import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { createDOM } from '../../../utils';

@Component({
  selector: 'button[xft-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {
  @Input('xft-button')
  public xftButton = 'flat';

  @Input()
  public prefixIcon?: string;

  @Input()
  public suffixIcon?: string;

  protected classButton = 'xft-button__content--flat';

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-button');

    this.classButton = `xft-button__content--${this.xftButton}`;
  }
}
