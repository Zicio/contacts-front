import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Contact from "../components/Contact";
import ErrorWindow from "../components/ErrorWindow";
import Loader from "../components/Loader";
import { CustomError, IContact } from "../models/models";
import {
  useCreateNewContactMutation,
  useEditContactMutation,
  useGetContactsQuery,
  useLogoutMutation,
} from "../store/api/contacts.api";
import PopupForm from "../components/PopupForm";
import Form from "../components/Form";
import Input from "../components/Input";
import Notification from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { activate, deactivate } from "../store/popupSlice";
import { RootState } from "../store/store";

const ListPage: React.FC = () => {
  const { user } = useParams();

  const { data, isError, error, isLoading } = useGetContactsQuery();

  const [logout, { data: logoutData, isLoading: isLogoutLoading }] =
    useLogoutMutation();

  const [
    createContact,
    {
      data: createData,
      isLoading: isCreateLoading,
      isError: isCreateError,
      error: createError,
    },
  ] = useCreateNewContactMutation();

  const [
    edit,
    { data: editData, isLoading: isEditLoading, isError: isEditError },
  ] = useEditContactMutation();

  const { active: statePopup, data: dataPopup } = useSelector(
    (state: RootState) => state.popup
  );
  const dispatch = useDispatch();

  const navigate: NavigateFunction = useNavigate();

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
    dispatch(activate());
  };

  //Обработчик отправки нового контакта
  const handleNewContact: SubmitHandler<IContact> = async (form) => {
    await createContact(form);
    reset();
    dispatch(deactivate());
  };

  //Обработчик кнопки "Отмена" в модальном окне
  const handleCancellation: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    dispatch(deactivate());
  };

  //Навигация на страницу входа при успешном выходе из профиля
  useEffect(() => {
    if (logoutData || (isError && (error as CustomError).status === 403)) {
      navigate("/contacts");
    }
  }, [error, isError, logoutData, navigate]);

  const methods = useForm<IContact>({
    mode: "onChange",
  });
  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto h-screen">
        <Loader border={true} />
      </div>
    );
  }
  return (
    <>
      {statePopup && (
        <PopupForm>
          <Form
            onSubmit={handleNewContact}
            methods={methods}
            title="Создать новый контакт"
          >
            <Input
              name="name"
              type="text"
              active={isCreateLoading}
              data={dataPopup?.name}
            />
            <Notification message={errors.name?.message} />
            <Input
              name="surname"
              type="text"
              active={isCreateLoading}
              data={dataPopup?.surname}
            />
            <Notification message={errors.surname?.message} />
            <Input
              name="city"
              type="text"
              active={isCreateLoading}
              data={dataPopup?.city}
            />
            <Notification message={errors.city?.message} />
            <Input
              name="tel"
              type="tel"
              active={isCreateLoading}
              data={dataPopup?.tel}
            />
            <small>Формат +79********</small>
            <Notification message={errors.tel?.message} />
            <div className="flex justify-end items-center">
              <button
                className={`button button-red text-xl ${
                  isCreateLoading && "button-unactive"
                }`}
                type="button"
                onClick={handleCancellation}
                disabled={isCreateLoading}
              >
                Отмена
              </button>
              <button
                className={`button text-xl block button-fuchsia ml-[10px] ${
                  !isValid && "button-unactive"
                }`}
                type="submit"
                disabled={!isValid || isCreateLoading}
              >
                {isCreateLoading ? <Loader border={false} /> : "Создать"}
              </button>
            </div>
          </Form>
        </PopupForm>
      )}
      <div className="flex flex-col justify-center items-center mx-auto h-screen">
        {isError && (error as CustomError).status !== 403 ? (
          <ErrorWindow />
        ) : (
          <>
            <article className="box box-border min-w-[200px] w-fit mr-0 self-end grid grid-cols-2 gap-[10px] items-center font-bold text-xl">
              <span className="text-yellow-400 text-3xl text-center italic col-start-1 col-end-2 row-start-1 row-end-2">
                {user}
              </span>
              <button
                className="button button-fuchsia col-start-2 col-end-3 row-start-1 row-end-2 text-base"
                type="submit"
                onClick={handleLogout}
              >
                {isLogoutLoading ? <Loader border={false} /> : "Выйти"}
              </button>
              <button
                className="button button-fuchsia col-start-1 col-end-3 row-start-2 row-end-3 text-base"
                onClick={handleShowForm}
              >
                Создать новый контакт
              </button>
            </article>
            <main className="flex justify-center items-start mx-auto mt-[60px] h-screen box-border min-w-[350px] w-[50%] max-w-[500px]">
              {data && (
                <ul
                  className={`grid grid-rows-[${data.length}] gap-[20px] box-border w-full`}
                >
                  {data.map((contact: IContact) => (
                    <Contact key={contact.id} data={contact} />
                  ))}
                </ul>
              )}
            </main>
          </>
        )}
      </div>
    </>
  );
};
export default ListPage;
