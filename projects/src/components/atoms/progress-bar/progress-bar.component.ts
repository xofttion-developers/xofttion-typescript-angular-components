import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { createDOM } from 'projects/src/utils';

@Component({
  selector: 'xft-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input()
  public indeterminate = false;

  @Input()
  public width = 0;

  protected percentage = '0%';

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-progress-bar');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.changeStatusWidth(changes);
  }

  private changeStatusWidth(changes: SimpleChanges): void {
    if (changes['width']) {
      let width = changes['width'].currentValue;

      if (width < 0) {
        width = 0;
      } else if (width > 100) {
        width = 100;
      }

      this.percentage = `${width}%`;
    }
  }
}
