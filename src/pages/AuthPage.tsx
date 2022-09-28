import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../components/Loader";
import { IUser } from "../models/models";

import { useLazyAuthorizationQuery } from "../store/api/contacts.api";

const AuthPage: React.FC = () => {
  const [fetchData, { data, isLoading, isError }] = useLazyAuthorizationQuery();

  // const [form, setForm] = useState<IUser>({
  //   username: "",
  //   password: "",
  // });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUser>();

  // const handleChange: React.ChangeEventHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const name: string = e.target.name;
  //   const value: string = e.target.value.trim();
  //   setForm((prevForm) => ({ ...prevForm, [name]: value }));
  // };

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    // e.preventDefault();
    await fetchData(data);
  };

  return (
    <main className="flex justify-center items-start mx-auto h-screen text-md">
      <form
        className="border border-blue-400 rounded-md shadow-sm shadow-red-600 p-[15px] mt-[40px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-xl text-center">Вход</h1>
        <input
          {...(register("username"),
          {
            required: "Поле обязательно к заполнению!",
          })}
          className="input mt-[20px]"
          type="text"
          placeholder="Введите имя пользователя"
          // name="username"
          value="2"
          disabled={isLoading}
          // onChange={handleChange}
          // required
        />
        <div>{errors?.username && <p>{errors?.username?.message}</p>}</div>

        <input
          {...register("password")}
          className="input mt-[20px]"
          type="text"
          placeholder="Введите пароль"
          // name="password"
          // value={form.password}
          disabled={isLoading}
          // onChange={handleChange}
          // required
        />
        {isLoading ? (
          <Loader />
        ) : (
          <button
            className="button mt-[20px] block mx-auto bg-blue-600"
            type="submit"
          >
            Войти
          </button>
        )}
      </form>
    </main>
  );
};
export default AuthPage;
