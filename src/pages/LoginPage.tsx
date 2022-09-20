import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { IUser } from "../models/models";
import { useLazyLoginQuery } from "../store/api/contacts.api";

const LoginPage: React.FC = () => {
  const [fetchData, { data, isLoading, isError }] = useLazyLoginQuery();

  const [form, setForm] = useState<IUser>({
    login: "",
    password: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value.trim();
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchData(form);
  };

  return (
    <main className="flex justify-center items-start mx-auto h-screen text-md">
      <form
        className="border border-blue-400 rounded-md shadow-sm shadow-red-600 p-[15px] mt-[40px]"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl text-center">Вход</h1>
        <input
          className="input mt-[20px]"
          type="text"
          placeholder="Введите логин"
          name="login"
          value={form.login}
          disabled={isLoading}
          onChange={handleChange}
          required
        />
        <input
          className="input mt-[20px]"
          type="text"
          placeholder="Введите пароль"
          name="password"
          value={form.password}
          disabled={isLoading}
          onChange={handleChange}
          required
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
export default LoginPage;
