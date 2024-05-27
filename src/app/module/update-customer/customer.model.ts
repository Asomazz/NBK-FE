export class Customer {
  id: string = '';
  name: string = '';
  number: string = '';
  dateOfBirth: Date | null = null;
  gender: Gender = Gender.Female;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}
