import React from "react";
import { useDispatch } from "react-redux";
import { IContact } from "../models/models";
import { useDeleteContactMutation } from "../store/api/contacts.api";
import { activate } from "../store/popupSlice";
import Loader from "./Loader";
import Notification from "./Notification";

const Contact: React.FC<{ data: IContact }> = (props) => {
  const { data: contactData } = props;

  const [deleteContact, { isError, isLoading }] = useDeleteContactMutation();

  const dispatch = useDispatch();

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(activate(contactData));
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (contactData.id) {
      await deleteContact(contactData.id);
    }
  };

  return (
    <li className="box grid grid-cols-[35%_55%] gap-y-[10px] font-semibold text-base">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2">
        <span className="text-yellow-400">Name: </span>
        <span>{contactData.name}</span>
      </div>
      <div className="col-start-1 col-end-2 row-start-2 row-end-3">
        <span className="text-yellow-400">Surname: </span>
        <span>{contactData.surname}</span>
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2">
        <span className="text-yellow-400">City: </span>
        <span>{contactData.city}</span>
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <span className="text-yellow-400">Tel.: </span>
        <span>{contactData.tel}</span>
      </div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-4 grid grid-cols-2 auto-cols-auto gap-[5px]">
        <button
          className="button button-yellow p-[5px]"
          type="button"
          onClick={handleEdit}
        >
          Изменить
        </button>
        {isLoading ? (
          <Loader border={false} />
        ) : (
          <button
            className="button button-red p-[5px]"
            type="submit"
            onClick={handleDelete}
          >
            Удалить
          </button>
        )}
      </div>
      {isError && (
        <div className="col-start-1 col-end-3 row-start-4 row-end-5">
          <Notification message="Возникла ошибка при удалении контакта. Попробуйте еще раз" />
        </div>
      )}
    </li>
  );
};
export default Contact;
