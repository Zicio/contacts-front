import { IContact } from "../models/models";

const Contact: React.FC<{ data: IContact }> = (props) => {
  const { data } = props;
  return (
    <tr>
      <th className="table-cell text-left">{data.name}</th>
      <th className="table-cell text-left">{data.surname}</th>
      <th className="table-cell text-left">{data.city}</th>
      <th className="table-cell text-left">{data.tel}</th>
    </tr>
  );
};
export default Contact;
