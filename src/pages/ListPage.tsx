import { useCallback, useEffect } from "react";
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
  const [
    logout,
    { data: logoutData, isError: isLogoutError, isLoading: isLogoutLoading },
  ] = useLogoutMutation();
  const { data, isError, error, isLoading } = useGetContactsQuery();
  const navigate: NavigateFunction = useNavigate();

  const get_cookie = useCallback((name: string) => {
    return document.cookie.split(";").some((c) => {
      return c.trim().startsWith(name + "=");
    });
  }, []);

  const delete_cookie = useCallback(
    (name: string, path: string, domain: string) => {
      if (get_cookie(name)) {
        document.cookie =
          name +
          "=" +
          (path ? ";path=" + path : "") +
          (domain ? ";domain=" + domain : "") +
          ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
      return;
    },
    []
  );

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await logout();
  };

  useEffect(() => {
    if (logoutData) {
      delete_cookie("token", "/", "localhost");
      navigate("/contacts");
    }
  }, [delete_cookie, logoutData, navigate]);

  useEffect(() => {
    if (error && (error as CustomError).status === 403) {
      navigate("/contacts");
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto h-screen">
        <Loader border={true} />
      </div>
    );
  }
  if (data) {
    return (
      <>
        <article>
          <span>{user}</span>
          <button
            className="button bg-red-500"
            type="submit"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </article>
        <div className="flex justify-center items-center mx-auto h-screen">
          {isError && <ErrorWindow />}
          {data &&
            data.map((contact: IContact) => (
              <Contact key={contact.id} data={contact} />
            ))}
        </div>
      </>
    );
  }
  return <></>;
};
export default ListPage;
