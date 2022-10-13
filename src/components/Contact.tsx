import React from "react";
import { IContact } from "../models/models";
import { useDeleteContactMutation } from "../store/api/contacts.api";
import Loader from "./Loader";

const Contact: React.FC<{ data: IContact }> = (props) => {
  const { data: contactData } = props;
  const [deleteContact, { data, isError, isLoading }] =
    useDeleteContactMutation();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteContact(contactData.id);
  };

  return (
    <li className="box grid grid-cols-[35%_55%] gap-x-[20px] gap-y-[10px] justify-between font-semibold">
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
        <button className="button button-yellow" type="submit">
          Изменить
        </button>
        {isLoading ? (
          <Loader border={false} />
        ) : (
          <button
            className="button button-red"
            type="submit"
            onClick={handleDelete}
          >
            Удалить
          </button>
        )}
      </div>
    </li>
  );
};
export default Contact;
