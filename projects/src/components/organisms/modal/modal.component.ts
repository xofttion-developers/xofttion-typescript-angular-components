import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { DOMComponent, createDOM } from '../../../utils';

@Component({
  selector: 'xft-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input()
  public visible = false;

  private domComponent: DOMComponent;

  private component?: Element;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.domComponent = createDOM(this.ref, this.renderer);
  }

  public ngOnInit(): void {
    this.domComponent.addClass('xft-modal');
  }

  public get show(): boolean {
    return this.visible;
  }

  public open(): void {
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
  }

  public append(children: any): void {
    this.component
      ? this.component.appendChild(children)
      : this.domComponent
          .querySelector('.xft-modal__component')
          .present((component) => {
            component.appendChild(children);
            this.component = component;
          });
  }
}
