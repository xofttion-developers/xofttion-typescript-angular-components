import { getInitials } from '@xofttion/utils';
import { ListFieldElement } from 'projects/src/components/organisms';

class Person {
  constructor(
    public readonly documento: string,
    public readonly nombre: string
  ) {}
}

class PersonElement implements ListFieldElement {
  public initials: string;

  constructor(private person: Person) {
    this.initials = getInitials(person.nombre);
  }

  public get title(): string {
    return this.person.nombre;
  }

  public get subtitle(): string | undefined {
    return `Documento: ${this.person.documento}`;
  }

  public get description(): string {
    return this.person.nombre;
  }

  public get value(): any {
    return this.person;
  }

  compareTo(_: unknown): boolean {
    return true;
  }

  hasCoincidence(_: string): boolean {
    return true;
  }
}

export const personsElement: PersonElement[] = [
  new PersonElement(new Person('1065642202', 'DANIEL CASTILLO PEDROZA')),
  new PersonElement(new Person('1065784783', 'ADRIAN CASTILLO PEDROZA')),
  new PersonElement(new Person('1066747874', 'FABIAN CASTILLO PEDROZA')),
  new PersonElement(new Person('73172818', 'MILTON CASTILLO MARTINEZ')),
  new PersonElement(new Person('49857331', 'YOMAIRA PEDROZA PAYARES'))
];
