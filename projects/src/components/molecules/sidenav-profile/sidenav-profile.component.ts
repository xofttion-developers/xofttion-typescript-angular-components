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
  selector: 'xft-sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavProfileComponent implements OnInit {
  @Input()
  public initials?: string;

  @Input()
  public subtitle?: string;

  @Input()
  public skeleton = false;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-sidenav-profile');
  }
}
