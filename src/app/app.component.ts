import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { personsElement } from './resources/persons';
import { PaletteMaterial } from './utils/palette';
import { PopupComponentService } from 'projects/src/components/organisms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public control: FormControl;
  public salary: FormControl;
  public role: FormControl;

  public persons = personsElement;

  public checked = false;

  constructor(private popupService: PopupComponentService) {
    this.control = new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5)
    ]);

    this.salary = new FormControl();
    this.role = new FormControl();

    console.log(new PaletteMaterial('#18B6F6'));
  }

  public onConfirmation(): void {
    this.popupService.launch({
      message: '¿Desea realizar el registro de la factura de venta?',
      subtitle: 'Xigeness v0.9.2',
      title: 'Factura de venta',
      approved: {
        label: 'Registrar'
      },
      reject: {
        label: 'Cancelar registro'
      }
    });
  }
}
