import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { PopupConfig } from './popup.config';
import { createDOM } from 'projects/src/utils';

@Component({
  selector: 'xft-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit {
  protected config?: PopupConfig;

  protected visible = false;

  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-popup');
  }

  public launch(config: PopupConfig): void {
    this.config = config;

    this.visible = true;
  }

  public onApproved(): void {
    this.visible = false;

    if (this.config?.approved?.onClick) {
      this.config.approved.onClick();
    }
  }

  public onReject(): void {
    this.visible = false;

    if (this.config?.reject?.onClick) {
      this.config.reject.onClick();
    }
  }
}
