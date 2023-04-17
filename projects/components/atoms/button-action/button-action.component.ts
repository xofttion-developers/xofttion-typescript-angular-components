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
  selector: 'button[xft-button-action]',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonActionComponent implements OnInit {
  @Input('xft-button-action')
  public declare icon: string;

  @Input()
  public tooltip?: string;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-button-action');
  }
}
