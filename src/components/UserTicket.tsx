import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { IContact } from "../models/models";
import { useLogoutMutation } from "../store/api/contacts.api";
import { activate } from "../store/popupSlice";
import { deactivateRefresh } from "../store/refreshJWTSlice";
import Loader from "./Loader";

const UserTicket: React.FC<{ resetForm: UseFormReset<IContact> }> = (props) => {
  const { resetForm } = props;
  const { user } = useParams();

  const dispatch = useDispatch();

  const navigate: NavigateFunction = useNavigate();

  //Logout
  const [logout, { data: logoutData, isLoading: isLogoutLoading }] =
    useLogoutMutation();

  //Обработчик выхода из профиля
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await logout();
    dispatch(deactivateRefresh());
    localStorage.clear();
  };

  //Обработчик появления формы для нового контакта
  const handleShowForm: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    resetForm();
    dispatch(activate());
  };

  //Навигация на страницу входа при успешном выходе из профиля
  useEffect(() => {
    if (logoutData) {
      navigate("/contacts");
    }
  }, [logoutData, navigate]);

  return (
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
  );
};
export default UserTicket;
