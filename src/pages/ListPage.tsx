import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Contact from "../components/Contact";
import Form from "../components/Form";
import ErrorWindow from "../components/ErrorWindow";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { CustomError, IContact } from "../models/models";
import {
  useCreateNewContactMutation,
  useGetContactsQuery,
  useLogoutMutation,
} from "../store/api/contacts.api";

const ListPage: React.FC = () => {
  const { user } = useParams();

  const { data, isError, error, isLoading } = useGetContactsQuery();
  const [logout, { data: logoutData, isLoading: isLogoutLoading }] =
    useLogoutMutation();
  const [
    createContact,
    { data: createData, isLoading: isCreateLoading, isError: isCreateError },
  ] = useCreateNewContactMutation();
  const [popupForm, setPopupForm] = useState<Boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const methods = useForm<IContact>({
    mode: "onChange",
  });
  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  //Обработчик выхода из профиля
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await logout();
  };

  //Обработчик появления формы для нового контакта
  const handleShowForm: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPopupForm(true);
  };

  //Обработчик отправки нового контакта
  const handleNewContact: SubmitHandler<IContact> = async (form) => {
    await createContact(form);
    reset();
    setPopupForm(false);
  };

  //Навигация на страницу входа при успешном выходе из профиля
  useEffect(() => {
    if (logoutData || (isError && (error as CustomError).status === 403)) {
      navigate("/contacts");
    }
  }, [error, isError, logoutData, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto h-screen">
        <Loader border={true} />
      </div>
    );
  }
  return (
    <>
      {popupForm && (
        // <div className="fixed "></div>
        <article className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Form
            onSubmit={handleNewContact}
            methods={methods}
            title="Создать новый контакт"
          >
            <Input name="name" type="text" active={isCreateLoading} />
            <Notification message={errors.name?.message} />
            <Input name="surname" type="text" active={isCreateLoading} />
            <Notification message={errors.surname?.message} />
            <Input name="city" type="text" active={isCreateLoading} />
            <Notification message={errors.city?.message} />
            <Input name="tel" type="text" active={isCreateLoading} />
            <Notification message={errors.tel?.message} />
            {isLoading ? (
              <Loader border={false} />
            ) : (
              <button
                className={`button text-xl ${
                  !isValid && "opacity-50 hover:shadow-none"
                } mt-[20px] block mx-auto mb-[20px] button-fuchsia`}
                type="submit"
                disabled={!isValid || (popupForm as boolean | undefined)}
              >
                Создать
              </button>
            )}
          </Form>
        </article>
      )}
      <div className="flex flex-col justify-center p-[20px]">
        <article className="box w-fit mr-[0px] self-end grid grid-cols-2 gap-[10px] items-center font-bold text-xl">
          <span className="text-yellow-400 text-3xl text-center italic col-start-1 col-end-2 row-start-1 row-end-2">
            {user}
          </span>
          <button
            className="button button-fuchsia col-start-2 col-end-3 row-start-1 row-end-2 text-base"
            type="submit"
            disabled={popupForm as boolean | undefined}
            onClick={handleLogout}
          >
            {isLogoutLoading ? <Loader border={false} /> : "Выйти"}
          </button>
          <button
            className="button button-fuchsia col-start-1 col-end-3 row-start-2 row-end-3 text-base"
            disabled={popupForm as boolean | undefined}
            onClick={handleShowForm}
          >
            Создать новый контакт
          </button>
        </article>
        <main className="flex justify-center items-center mx-auto h-screen">
          {isError && (error as CustomError).status !== 403 && <ErrorWindow />}
          {data && (
            <ul
              className={`grid grid-rows-[${data.length}] gap-[20px] min-w-[500px]`}
            >
              {data.map((contact: IContact) => (
                <Contact key={contact.id} data={contact} />
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
};
export default ListPage;
