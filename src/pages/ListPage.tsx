import { useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Contact from "../components/Contact";
import ErrorWindow from "../components/ErrorWindow";
import Loader from "../components/Loader";
import { CustomError, IContact } from "../models/models";
import {
  useGetContactsQuery,
  useLogoutMutation,
} from "../store/api/contacts.api";

const ListPage: React.FC = () => {
  const { user } = useParams();
  const [logout, { data: logoutData, isLoading: isLogoutLoading }] =
    useLogoutMutation();
  const { data, isError, error, isLoading } = useGetContactsQuery();
  const navigate: NavigateFunction = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await logout();
  };

  useEffect(() => {
    if (logoutData || (isError && (error as CustomError).status === 403)) {
      navigate("/contacts");
    }
  }, [error, isError, logoutData, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto h-screen">
        <Loader border={true} />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center p-[20px]">
      <article className="box w-fit mr-[0px] self-end grid grid-cols-2 gap-[10px] items-center font-bold text-xl">
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
        <button className="button button-fuchsia col-start-1 col-end-3 row-start-2 row-end-3 text-base">
          Создать новый контакт
        </button>
      </article>
      <main className="flex justify-center items-center mx-auto h-screen">
        {isError && (error as CustomError).status !== 403 && <ErrorWindow />}
        {data && (
          <ul
            className={`grid grid-rows-[${data.length}] gap-[20px] min-w-[500px]`}
          >
            {data.map((contact: IContact) => (
              <Contact key={contact.id} data={contact} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};
export default ListPage;
