import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { createDOM, DOMComponent } from '../../../utils';

@Component({
  selector: 'xft-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnChanges {
  @Input()
  public visible = true;

  @Input()
  public condense = false;

  @Output()
  public visibleChange: EventEmitter<boolean>;

  private domComponent: DOMComponent;

  constructor(protected ref: ElementRef, protected renderer: Renderer2) {
    this.visibleChange = new EventEmitter<boolean>();

    this.domComponent = createDOM(this.ref, this.renderer);
  }

  public ngOnInit(): void {
    this.domComponent.addClass('xft-sidenav');

    this.statusVisible(this.visible);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      this.statusVisible(changes['visible'].currentValue);
    }

    if (changes['condense']) {
      this.domComponent.toggleClass(
        'xft-sidenav--condense',
        changes['condense'].currentValue
      );
    }
  }

  public onClickBackdrop(): void {
    this.statusVisible(false);
    this.visible = false;

    this.visibleChange.emit(false);
  }

  private statusVisible(value: boolean): void {
    this.domComponent.toggleClass('xft-sidenav--hide', !value);
    this.domComponent.toggleClass('xft-sidenav--show', value);
  }
}
