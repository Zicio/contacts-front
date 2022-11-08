import { useForm, SubmitHandler } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  CustomError,
  FormMethods,
  FormSubmitHandler,
  IUser,
} from "../models/models";
import {
  contactsApi,
  useAuthorizationMutation,
} from "../store/api/contacts.api";
import Notification from "../components/Notification";
import Input from "../components/Input";
import ErrorWindow from "../components/ErrorWindow";
import { useEffect } from "react";
import Form from "../components/Form";
import { activateRefresh } from "../store/refreshJWTSlice";
import { useDispatch } from "react-redux";

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const [fetchData, { data, isLoading, isError, error }] =
    useAuthorizationMutation();
  const {
    error: accessError,
    isError: isAcessError,
    isSuccess: isAcessSuccess,
  } = contactsApi.endpoints.getContacts.useQueryState();

  const methods = useForm<IUser>({
    mode: "onChange",
  });
  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  const navigate: NavigateFunction = useNavigate();

  //Обработчика отправки формы авторизации
  const onSubmit: SubmitHandler<IUser> = async (form) => {
    await fetchData(form);
    reset();
  };

  // Чистка LocalStorage при отсутствии accessJwToken + Навигация на страницу контактов при активном accessJWToken
  useEffect(() => {
    if (document.cookie.indexOf("accessJwToken") === -1) {
      localStorage.clear();
    }
    localStorage.user && navigate(`/contacts/${localStorage.user}`);
  }, []);

  //Запись username в LocalStorage при успешной авторизации
  useEffect(() => {
    if (data) {
      dispatch(activateRefresh());
      localStorage.user = data;
      navigate(`/contacts/${data}`);
    }
  }, [data, navigate]);

  return (
    <main className="flex justify-center items-center mx-auto h-screen text-md">
      {isError && (error as CustomError).status !== 401 ? (
        <ErrorWindow />
      ) : (
        <Form
          onSubmit={onSubmit as FormSubmitHandler}
          methods={methods as FormMethods}
          title="Вход"
        >
          <Input name="username" type="text" active={isLoading} />
          <Notification message={errors.username?.message} />
          <Input name="password" type="password" active={isLoading} />
          <small className="text-gray-400">
            Только латинские буквы и цифры
          </small>
          <Notification message={errors.password?.message} />
          {isLoading ? (
            <Loader border={false} />
          ) : (
            <button
              className={`button text-xl block mx-auto button-fuchsia ${
                !isValid && "button-unactive"
              }`}
              type="submit"
              disabled={!isValid || isLoading}
            >
              Войти
            </button>
          )}
          {isError && (error as CustomError).status === 401 && (
            <Notification message={(error as CustomError).data} />
          )}
          {isAcessSuccess &&
            isAcessError &&
            (accessError as CustomError).status === 403 && (
              <Notification message={(accessError as CustomError).data} />
            )}
        </Form>
      )}
    </main>
  );
};
export default AuthPage;
