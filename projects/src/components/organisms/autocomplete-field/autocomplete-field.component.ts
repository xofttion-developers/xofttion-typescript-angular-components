import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasPattern } from '@xofttion/utils';
import { ListFieldElement } from '../list-field/list-field-element';
import { ListFieldComponent } from '../list-field/list-field.component';

type StoreCoincidenceNulleable = StoreCoincidence | null;

interface StoreCoincidence {
  pattern: string;
  value?: Array<ListFieldElement>;
  before: StoreCoincidenceNulleable;
}

@Component({
  selector: 'xft-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: [
    '../list-field/list-field.component.scss',
    './autocomplete-field.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteFieldComponent),
      multi: true
    }
  ]
})
export class AutocompleteFieldComponent
  extends ListFieldComponent
  implements OnChanges
{
  @HostListener('document:click', ['$event.target'])
  public onClickDocument(element: HTMLElement) {
    if (!this.ref.nativeElement?.contains(element)) {
      this.hideSuggestions();
    }
  }

  @Input()
  public requestAllow = false;

  @Input()
  public requesting = false;

  @Output()
  public request = new EventEmitter<string>();

  private store: StoreCoincidence = {
    pattern: '',
    value: [],
    before: null
  };

  private coindicence = '';

  public description = '';

  public coincidences: Array<ListFieldElement> = [];

  public get isSelected(): boolean {
    return !!this.value;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['suggestions']) {
      this.rebootStore();
      this.searchSuggestions(this.suggestion);
    }
  }

  public onOpen(): void {
    this.onFocus();

    setTimeout(() => this.inputElement?.focus(), 240);
  }

  public override onFocus(): void {
    super.onFocus();

    this.suggestion = this.coindicence;

    this.searchSuggestions(this.suggestion);

    this.showSuggestions();
  }

  public override onBlur(): void {
    super.onBlur();
  }

  public onKeydownInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Escape':
        this.hideSuggestions();
        break;

      case 'Tab':
        this.hideSuggestions();
        break;

      default:
        this.navigationInput(event);
        break;
    }
  }

  public onKeydownElement(
    event: KeyboardEvent,
    element: ListFieldElement
  ): void {
    switch (event.code) {
      case 'Enter':
        this.onSelect(element);
        break;

      default:
        this.navigationElement(event);
        break;
    }
  }

  public onSelect(element: ListFieldElement): void {
    this.hideSuggestions();

    this.description = element.description;

    this.setDefineValue(element);

    this.store = {
      pattern: this.coindicence,
      value: this.coincidences,
      before: null
    };
  }

  public onInput(event: Event): void {
    const inputTarget = event.target as HTMLInputElement;

    this.coindicence = inputTarget.value;
    this.suggestion = inputTarget.value;

    this.searchSuggestions(inputTarget.value);
  }

  public onClear(): void {
    this.coindicence = '';
    this.description = '';

    this.setValue();

    this.onChange();
    this.onTouch();

    this.focusInput();
  }

  public onRequest(): void {
    this.request.emit(this.suggestion);
  }

  protected override navigationInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowDown':
        this.navigationInputDown();
        break;
    }
  }

  private searchSuggestions(value: string | null): void {
    if (value) {
      const store = this.searchInStore(value);

      let suggestions = this.suggestions;

      if (store?.value) {
        suggestions = store.value;
      }

      const coincidences = suggestions.filter((element) =>
        element.hasCoincidence(value)
      );

      this.coincidences = coincidences.slice(0, 6);

      this.store = {
        value: coincidences,
        before: store,
        pattern: value
      };
    } else {
      this.coincidences = this.suggestions.slice(0, 6);

      this.rebootStore();
    }
  }

  private searchInStore(value: string): StoreCoincidence | null {
    if (this.store.pattern) {
      let coincidences: StoreCoincidenceNulleable = this.store;
      let isSearch = false;

      while (!isSearch && coincidences) {
        isSearch = hasPattern(value, coincidences.pattern, true);

        if (!isSearch) {
          coincidences = coincidences.before;
        }
      }

      return coincidences ? coincidences : this.rebootStore();
    }

    return null;
  }

  private rebootStore(): StoreCoincidence {
    return (this.store = {
      pattern: '',
      value: undefined,
      before: undefined || null
    });
  }
}
