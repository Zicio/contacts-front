import { ChangeEventHandler, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Contact from "../components/Contact";
import ErrorWindow from "../components/ErrorWindow";
import Loader from "../components/Loader";
import { CustomError, IContact } from "../models/models";
import {
  useChangeContactMutation,
  useGetContactsQuery,
  useLogoutMutation,
} from "../store/api/contacts.api";
import PopupForm from "../components/PopupForm";
import Form from "../components/Form";
import Input from "../components/Input";
import Notification from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { deactivate } from "../store/popupSlice";
import { addContacts } from "../store/contactsListSlice";
import { RootState } from "../store/store";
import UserTicket from "../components/UserTicket";

const ListPage: React.FC = () => {
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
  ] = useChangeContactMutation();

  const dispatch = useDispatch();

  const { active: statePopup, data: dataPopup } = useSelector(
    (state: RootState) => state.popup
  );

  // const contacts = useSelector((state: RootState) => state.contacts);

  const navigate: NavigateFunction = useNavigate();

  //Обработчик отправки нового контакта
  const handleContact: SubmitHandler<IContact> = async (form) => {
    dataPopup?.id && (form.id = dataPopup.id);
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

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    console.log(e.target.options[0].value);
    // data?.sort((a, b) => {
    //   if (a.name > b.name) {
    //     return 1;
    //   }
    //   if (a.name < b.name) {
    //     return -1;
    //   }
    //   return 0;
    // })
  };

  //Навигация на страницу входа при ошибке права доступа
  useEffect(() => {
    if (isError && (error as CustomError).status === 403) {
      navigate("/contacts");
    }
  }, [error, isError, logoutData, navigate]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(addContacts(data))
  //   }
  // }, [data, dispatch]);

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
            onSubmit={handleContact}
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
      <div className="flex flex-col justify-center items-center mx-auto h-screen p-[20px]">
        {isError && (error as CustomError).status !== 403 ? (
          <ErrorWindow />
        ) : (
          <>
            <UserTicket />
            <main className="flex flex-col justify-start items-start mx-auto mt-[60px] h-screen box-border min-w-[350px] w-[50%] max-w-[500px]">
              {data && (
                <>
                  <select className="select" onChange={handleSelectChange}>
                    <option value="date">По дате создания</option>
                    <option value="descending alphabet">↑ По алфавиту</option>
                    <option value="ascending alphabet">↓ По алфавиту</option>
                  </select>
                  <ul
                    className={`grid grid-rows-[${data.length}] gap-[20px] box-border w-full`}
                  >
                    {data.map((contact: IContact) => (
                      <Contact key={contact.id} data={contact} />
                    ))}
                  </ul>
                </>
              )}
            </main>
          </>
        )}
      </div>
    </>
  );
};
export default ListPage;
