import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { createDOM } from '../../../utils';

@Component({
  selector: 'xft-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadiobuttonComponent implements OnInit {
  @Input()
  public checked = false;

  @Input()
  public disabled = false;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    const domComponent = createDOM(this.ref, this.renderer);

    domComponent.addClass('xft-radiobutton');
    domComponent.setAttribute('tabindex', '0');
  }
}
