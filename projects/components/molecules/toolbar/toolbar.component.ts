import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { createDOM } from '../../../utils';

@Component({
  selector: 'xft-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent {
  @Input()
  public subtitle?: string;

  @Input()
  public icon?: string;

  @Input()
  public breadcrumbs: string[] = [];

  @Output()
  public action: EventEmitter<MouseEvent>;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.action = new EventEmitter<MouseEvent>();
  }

  public ngOnInit(): void {
    createDOM(this.ref, this.renderer).addClass('xft-toolbar');
  }

  public onClickAction(event: MouseEvent): void {
    this.action.emit(event);
  }
}
