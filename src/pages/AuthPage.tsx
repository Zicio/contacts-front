import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Loader from "../components/Loader";
import { IUser } from "../models/models";
import { useLazyAuthorizationQuery } from "../store/api/contacts.api";
import Notification from "../components/Notification";

const AuthPage: React.FC = () => {
  const [fetchData, { data, isLoading, isError }] = useLazyAuthorizationQuery();

  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IUser>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IUser> = async (form: IUser) => {
    await fetchData(form);

    reset();
  };

  return (
    <main className="flex justify-center items-start mx-auto h-screen text-md bg-gradient-to-tr from-black via-fuchsia-700 to-sky-400">
      <form
        className="border border-black rounded-md shadow-lg shadow-black p-[15px] mt-[40px] min-w-[300px] bg-gray-800"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-xl text-center text-fuchsia-600">Вход</h1>
        <input
          {...register("username", {
            required: "Поле обязательно к заполнению!",
            minLength: {
              value: 4,
              message: "Минимум 5 символов",
            },
            maxLength: {
              value: 10,
              message: "Максимум 10 символов",
            },
            pattern: {
              value: /[A-Za-z]/g,
              message: "Только латинские буквы",
            },
          })}
          className="input mt-[20px] w-full"
          type="text"
          placeholder="Введите имя пользователя"
          disabled={isLoading}
        />
        <Notification name={errors.username} />

        <input
          {...register("password", {
            required: "Поле обязательно к заполнению!",
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
            maxLength: {
              value: 10,
              message: "Максимум 10 символов",
            },
            pattern: {
              value: /[A-Za-z0-9]/g,
              message: "Только латинские буквы",
            },
          })}
          className="input mt-[20px] w-full"
          type="text"
          placeholder="Введите пароль"
          disabled={isLoading}
        />
        <Notification name={errors.password} />
        {isLoading ? (
          <Loader />
        ) : (
          <button
            className={`button ${
              !isValid && "opacity-50 hover:shadow-none"
            } mt-[20px] block mx-auto bg-fuchsia-600`}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
        )}
      </form>
      <DevTool control={control} />
    </main>
  );
};
export default AuthPage;
