import { Component, ViewEncapsulation } from '@angular/core';
import { PaletteMaterial } from './utils/palette';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {
    console.log(new PaletteMaterial('#4E73F8'));
  }
}
