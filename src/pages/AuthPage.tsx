import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import Loader from "../components/Loader";
import { CustomError, IUser } from "../models/models";
import { useLazyAuthorizationQuery } from "../store/api/contacts.api";
import Notification from "../components/Notification";
import Input from "../components/Input";
import ErrorWindow from "../components/ErrorWindow";
import { useEffect } from "react";

const AuthPage: React.FC = () => {
  const [fetchData, { data, isLoading, isError, error }] =
    useLazyAuthorizationQuery();

  const methods = useForm<IUser>({
    mode: "onChange",
  });
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = methods;

  const navigate: NavigateFunction = useNavigate();
  let name: string = "";

  const onSubmit: SubmitHandler<IUser> = async (form) => {
    await fetchData(form);
    name = form.username;
    reset();
    navigate(`/contacts/${name}`);
  };

  // useEffect(() => {
  //   if (data) {
  //     localStorage.setItem("token", data);
  //   }
  // }, [data]);

  return (
    <main className="flex justify-center items-center mx-auto h-screen text-md bg-gradient-to-tr from-black via-fuchsia-700 to-sky-400">
      {isError && (error as CustomError).status !== 401 ? (
        <ErrorWindow />
      ) : (
        <FormProvider {...methods}>
          <form
            className="border border-black rounded-md shadow-lg shadow-black p-[15px] mt-[40px] min-w-[300px] bg-gray-800"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-xl text-center text-fuchsia-600">
              Вход
            </h1>
            <Input name="username" type="text" active={isLoading} />
            <Notification message={errors.username?.message} />
            <Input name="password" type="password" active={isLoading} />
            <Notification message={errors.password?.message} />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                className={`button ${
                  !isValid && "opacity-50 hover:shadow-none"
                } mt-[20px] block mx-auto mb-[20px] bg-fuchsia-600`}
                type="submit"
                disabled={!isValid}
              >
                Войти
              </button>
            )}
            {isError && (error as CustomError).status === 401 && (
              <Notification message={(error as CustomError).data} />
            )}
          </form>
          <DevTool control={control} />
        </FormProvider>
      )}
    </main>
  );
};
export default AuthPage;
