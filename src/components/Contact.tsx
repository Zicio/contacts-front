import { IContact } from "../models/models";

const Contact: React.FC<{ data: IContact }> = (props) => {
  const { data } = props;
  return <div>Contact</div>;
};
export default Contact;
