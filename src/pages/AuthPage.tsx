import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Loader from "../components/Loader";
import { IUser } from "../models/models";
import { useLazyAuthorizationQuery } from "../store/api/contacts.api";
import Notification from "../components/Notification";
import Input from "../components/Input";
import { useEffect } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

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

  const onSubmit: SubmitHandler<IUser> = async (form: IUser) => {
    await fetchData(form);
    reset();
  };

  // useEffect(() => {
  //   console.log(error);
  // });

  return (
    <main className="flex justify-center items-start mx-auto h-screen text-md bg-gradient-to-tr from-black via-fuchsia-700 to-sky-400">
      <FormProvider {...methods}>
        <form
          className="border border-black rounded-md shadow-lg shadow-black p-[15px] mt-[40px] min-w-[300px] bg-gray-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl text-center text-fuchsia-600">
            Вход
          </h1>
          <Input name={"username"} active={isLoading} />
          <Notification message={errors.username?.message} />
          <Input name={"password"} active={isLoading} />
          <Notification message={errors.password?.message} />
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
        {isError && <Notification name={error?.data} />}
        <DevTool control={control} />
      </FormProvider>
    </main>
  );
};
export default AuthPage;