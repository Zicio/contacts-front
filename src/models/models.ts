export interface IUser {
  username?: string;
  password?: string;
}

export enum Warning {
  username = "имя пользователя",
  password = "пароль",
  name = "имя",
  surname = "фамилия",
  city = "город",
  tel = "номер телефона",
}

export interface CustomError {
  data: string;
  status: number;
}

export interface IContact {
  id?: string;
  name: string;
  surname: string;
  tel: string;
  city: string;
}

export interface IValidationRules {
  regExp: RegExp;
  maxLength: number;
  minLength: number;
}

export interface IPopupState {
  active: boolean;
  data?: IContact;
}

export enum Sort {
  date = "По дате создания",
  ascendingAlphabet = "↑ По имени",
  descendingAlphabet = "↓ По имени",
}
