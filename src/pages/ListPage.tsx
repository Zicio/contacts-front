import { useParams } from "react-router-dom";

const ListPage: React.FC = () => {
  const { user } = useParams();
  return <div>{user}</div>;
};
export default ListPage;
