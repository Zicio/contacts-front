import { IContact } from "../models/models";

const Contact: React.FC<{ data: IContact }> = (props) => {
  const { data } = props;
  return (
    <li className="box grid grid-cols-[35%_55%] gap-x-[20px] gap-y-[10px] justify-between font-semibold">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2">
        <span className="text-yellow-400">Name: </span>
        <span>{data.name}</span>
      </div>
      <div className="col-start-1 col-end-2 row-start-2 row-end-3">
        <span className="text-yellow-400">Surname: </span>
        <span>{data.surname}</span>
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2">
        <span className="text-yellow-400">City: </span>
        <span>{data.city}</span>
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <span className="text-yellow-400">Tel.: </span>
        <span>{data.tel}</span>
      </div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-4 grid grid-cols-2 auto-cols-auto gap-[5px]">
        <button className="button button-yellow">Изменить</button>
        <button className="button button-red">Удалить</button>
      </div>
    </li>
  );
};
export default Contact;
