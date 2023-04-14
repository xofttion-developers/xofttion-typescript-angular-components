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
  selector: 'xft-skeleton-text',
  templateUrl: './skeleton-text.component.html',
  styleUrls: ['./skeleton-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonTextComponent implements OnInit {
  @Input()
  public active = false;

  @Input()
  public truncate = false;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-skeleton-text');
  }
}
