import { useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { CustomError } from "../models/models";
import { useGetContactsQuery } from "../store/api/contacts.api";

const ListPage: React.FC = () => {
  const { user } = useParams();
  const { data, isError, error, isLoading } = useGetContactsQuery();
  const navigate: NavigateFunction = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    function get_cookie(name: string) {
      return document.cookie.split(";").some((c) => {
        return c.trim().startsWith(name + "=");
      });
    }

    function delete_cookie(name: string, path: string, domain: string) {
      if (get_cookie(name)) {
        document.cookie =
          name +
          "=" +
          (path ? ";path=" + path : "") +
          (domain ? ";domain=" + domain : "") +
          ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
    }

    e.preventDefault();
    delete_cookie("token", "/", "localhost");
    navigate("/contacts");
  };

  useEffect(() => {
    if (error && (error as CustomError).status === 403) {
      navigate("/contacts");
    }
  }, [error, navigate]);

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
      <main></main>
    </>
  );
};
export default ListPage;
