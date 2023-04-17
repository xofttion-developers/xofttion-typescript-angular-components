import { NgModule } from '@angular/core';
import { XofttionComponentsAtomsModule } from './atoms/atoms.module';
import { XofttionComponentsMoleculesModule } from './molecules/molecules.module';
import { XofttionComponentsOrganismsModule } from './organisms/organisms.module';

const modules = [
  XofttionComponentsAtomsModule,
  XofttionComponentsMoleculesModule,
  XofttionComponentsOrganismsModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class XofttionComponentsModule {}
