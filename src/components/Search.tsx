import { ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchType } from "../models/models";
import { useGetContactsQuery } from "../store/api/contacts.api";
import { searchContact } from "../store/contactsListSlice";
import Select from "./Select";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const { data: fetchData } = useGetContactsQuery();

  const [data, setData] = useState<string>("");

  const [type, setType] = useState<string>("");

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setType(e.target.options[e.target.selectedIndex].value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.trim();
    setData(value as string);
  };

  useEffect(() => {
    if (data && fetchData) {
      dispatch(searchContact({ type, data, fetchData }));
    }
  }, [data]);

  return (
    <div className="flex">
      <input
        className="input"
        type="text"
        placeholder="Поиск..."
        value={data}
        onChange={handleInputChange}
      />
      <Select
        options={["name", "surname", "city", "tel"]}
        onChange={handleSelectChange}
      />
    </div>
  );
};
export default Search;
