import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AtomsComponentsModule } from 'projects/src/components/atoms/atoms.module';
import { MoleculesComponentsModule } from 'projects/src/components/molecules/molecules.module';

registerLocaleData(localeCo);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AtomsComponentsModule,
    MoleculesComponentsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }]
})
export class AppModule {}
