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
  selector: 'xft-sidenav-element',
  templateUrl: './sidenav-element.component.html',
  styleUrls: ['./sidenav-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavElementComponent implements OnInit {
  @Input()
  public icon?: string;

  @Input()
  public disabled?: boolean;

  @Input()
  public skeleton = false;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-sidenav-element');
  }
}
