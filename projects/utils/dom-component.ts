import { ElementRef, Renderer2 } from '@angular/core';
import { Optional } from '@xofttion/utils';

export class DOMComponent {
  constructor(private ref: ElementRef, private render: Renderer2) {}

  public get element(): HTMLElement {
    return this.ref.nativeElement;
  }

  public addClass(className: string): void {
    this.render.addClass(this.element, className);
  }

  public removeClass(className: string): void {
    this.render.removeClass(this.element, className);
  }

  public toggleClass(className: string, status: boolean): void {
    status ? this.addClass(className) : this.removeClass(className);
  }

  public querySelector(selector: string): Optional<Element> {
    return Optional.build(this.element.querySelector(selector));
  }

  public querySelectorAll(selector: string): NodeListOf<HTMLElement> {
    return this.element.querySelectorAll(selector);
  }

  public setProperty(name: string, value: string): void {
    this.render.setProperty(this.element, name, value);
  }

  public setAttribute(name: string, value: string): void {
    this.render.setAttribute(this.element, name, value);
  }
}

export function createDOM(ref: ElementRef, renderer: Renderer2): DOMComponent {
  return new DOMComponent(ref, renderer);
}
