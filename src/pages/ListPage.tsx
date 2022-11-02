import { ChangeEventHandler, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import Contact from "../components/Contact";
import ErrorWindow from "../components/ErrorWindow";
import Loader from "../components/Loader";
import { CustomError, IContact } from "../models/models";
import {
  useChangeContactMutation,
  useGetContactsQuery,
  useLazyRefreshAccessQuery,
  useLogoutMutation,
} from "../store/api/contacts.api";
import PopupForm from "../components/PopupForm";
import Form from "../components/Form";
import Input from "../components/Input";
import Notification from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { deactivate } from "../store/popupSlice";
import { setContacts } from "../store/contactsListSlice";
import { RootState } from "../store/store";
import UserTicket from "../components/UserTicket";
import Select from "../components/Select";

const ListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const interval: number = 2400000; // Интервал отправки запроса на обновления токенов доступа (чуть меньше времени жизни accessToken)

  // Обновление токенов доступа
  const [refreshAccess] = useLazyRefreshAccessQuery();

  //State для вкл/откл интервала отправки запроса на обновление токенов
  const refresh: boolean = useSelector((state: RootState) => state.refreshJWT);

  // Интервал отправки запроса на обновление токенов
  useInterval(
    () => {
      refreshAccess();
    },
    refresh ? interval : null //TODO Убрать лишний State
  );

  //Получение контактов
  const { data, isError, error, isLoading } = useGetContactsQuery();

  //Выход из профиля
  const [, { data: logoutData }] = useLogoutMutation();

  //Создание или изменение контакта
  const [
    changeContact,
    { data: changeData, isLoading: isChangeLoading, isError: isChangeError },
  ] = useChangeContactMutation();

  //State Popup
  const { active: statePopup, data: dataPopup } = useSelector(
    (state: RootState) => state.popup
  );

  //State Contacts
  const contacts: IContact[] = useSelector(
    (state: RootState) => state.contacts
  );

  //Обработчик отправки нового(измененного) контакта
  const handleContact: SubmitHandler<IContact> = async (form) => {
    dataPopup?.id && (form.id = dataPopup.id);
    await changeContact(form);
  };

  //Закрытие модального окна после отправки данных формы
  useEffect(() => {
    if (changeData) {
      reset();
      dispatch(deactivate());
    }
  }, [changeData, dispatch]);

  //Обработчик кнопки "Отмена" в модальном окне
  const handleCancellation: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    dispatch(deactivate());
  };

  //Обработчик сортировки контактов
  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    console.log(e.target.options[e.target.selectedIndex].value);
    const arr = [...data!];
    switch (e.target.options[e.target.selectedIndex].value) {
      case "ascendingAlphabet":
        arr.sort((a, b) => {
          console.log(a);
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        break;
      case "descendingAlphabet":
        arr.sort((a, b) => {
          console.log(a);
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
        break;
    }
    dispatch(setContacts(arr));
  };

  //Навигация на страницу входа при ошибке права доступа
  useEffect(() => {
    if (isError && (error as CustomError).status === 403) {
      navigate("/contacts");
    }
  }, [error, isError, logoutData, navigate]);

  //Сохранение контактов в СontactsState
  useEffect(() => {
    if (data) {
      dispatch(setContacts(data));
    }
  }, [data, dispatch]);

  //Методы формы
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
              active={isChangeLoading}
              data={dataPopup?.name}
            />
            <Notification message={errors.name?.message} />
            <Input
              name="surname"
              type="text"
              active={isChangeLoading}
              data={dataPopup?.surname}
            />
            <Notification message={errors.surname?.message} />
            <Input
              name="city"
              type="text"
              active={isChangeLoading}
              data={dataPopup?.city}
            />
            <Notification message={errors.city?.message} />
            <Input
              name="tel"
              type="tel"
              active={isChangeLoading}
              data={dataPopup?.tel}
            />
            <small>Формат +79********</small>
            <Notification message={errors.tel?.message} />
            <div className="flex justify-end items-center">
              <button
                className={`button button-red text-xl ${
                  isChangeLoading && "button-unactive"
                }`}
                type="button"
                onClick={handleCancellation}
                disabled={isChangeLoading}
              >
                Отмена
              </button>
              <button
                className={`button text-xl block button-fuchsia ml-[10px] ${
                  !isValid && "button-unactive"
                }`}
                type="submit"
                disabled={!isValid || isChangeLoading}
              >
                {isChangeLoading ? <Loader border={false} /> : "Создать"}
              </button>
            </div>
            {isChangeError && (
              <Notification message="Возникла ошибка при создании(изменении) контакта. Попробуйте еще раз" />
            )}
          </Form>
        </PopupForm>
      )}
      <div className="flex flex-col justify-center items-center mx-auto h-screen p-[20px]">
        {isError && (error as CustomError).status !== 403 ? (
          <ErrorWindow />
        ) : (
          <>
            <UserTicket />
            <main className="flex flex-col justify-start items-start mx-auto mt-[60px] h-screen box-border min-w-[400px] w-[50%] max-w-[500px]">
              {data && (
                <>
                  <Select
                    onChange={handleSelectChange}
                    options={[
                      "date",
                      "ascendingAlphabet",
                      "descendingAlphabet",
                    ]}
                  />
                  <ul
                    className={`grid grid-rows-[${contacts.length}] gap-[20px] box-border w-full`}
                  >
                    {contacts.map((contact: IContact) => (
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
