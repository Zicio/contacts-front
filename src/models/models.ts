export interface IUser {
  username: string;
  password: string;
}

export enum Warning {
  username = "имя пользователя",
  password = "пароль",
}

export interface CustomError {
  data: string;
  status: number;
}
