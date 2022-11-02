import { IContact } from "./models";
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
  hidden?: boolean;
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

export enum SelectType {
  ascendingAlphabet = "↑ По имени",
  descendingAlphabet = "↓ По имени",
  name = "По имени",
  surname = "По фамилии",
  city = "По городу проживания",
  tel = "По номеру телефона",
}

export type refreshJWTSliceState = number | null;

export type searchType = "name" | "surname" | "city" | "tel";

export interface ISearch {
  type: string;
  data: string;
  fetchData: IContact[];
}
