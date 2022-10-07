import { useParams } from "react-router-dom";
import { useGetContactsQuery } from "../store/api/contacts.api";

const ListPage: React.FC = () => {
  console.log("yes");
  const { user } = useParams();
  // let token: string = localStorage.getItem("token") || "";
  // console.log(token);
  const { data, isError, error, isLoading } = useGetContactsQuery();
  return (
    <>
      <article>
        <span>{user}</span>
        <button>
          <img src="" alt="" />
        </button>
      </article>
      <main></main>
    </>
  );
};
export default ListPage;
