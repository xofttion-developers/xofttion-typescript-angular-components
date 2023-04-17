import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { createDOM } from '../../../utils';
import { SidenavMenuElement } from './sidenav-menu.element';

@Component({
  selector: 'xft-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavMenuComponent implements OnInit {
  @Input()
  public icon?: string;

  @Input()
  public skeleton = false;

  @Input()
  public elements: SidenavMenuElement[] = [];

  @Output()
  public select: EventEmitter<SidenavMenuElement>;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.select = new EventEmitter<SidenavMenuElement>();
  }

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-sidenav-menu');
  }

  public onClick(element: SidenavMenuElement): void {
    if (!element.disabled) {
      this.select.emit(element);
    }
  }
}
