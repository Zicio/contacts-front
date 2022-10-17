import { UseFormReturn } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
export interface IUser {
  username?: string;
  password?: string;
}

export enum Warning {
  username = "имя пользователя",
  password = "пароль",
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

// export interface IForm {
//   name: string,
//   onSubmit: SubmitHandler<IUser>,
//   methods: UseFormReturn,
//   inputs: []
// }
