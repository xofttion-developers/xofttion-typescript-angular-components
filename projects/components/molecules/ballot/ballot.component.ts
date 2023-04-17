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
  selector: 'xft-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BallotComponent implements OnInit {
  @Input()
  public initials?: string;

  @Input()
  public photo?: string;

  @Input()
  public subtitle?: string;

  @Input()
  public bordered = false;

  @Input()
  public skeleton = false;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-ballot');
  }

  public get hasAvatar(): boolean {
    return !!this.initials || !!this.photo;
  }
}
