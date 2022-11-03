import { ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IContact, searchType } from "../models/models";
import { useGetContactsQuery } from "../store/api/contacts.api";
import { searchContact, setContacts } from "../store/contactsListSlice";
import Select from "./Select";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const { data: fetchData } = useGetContactsQuery();

  const [data, setData] = useState<string>("");

  const [type, setType] = useState<searchType>("name");

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setType(e.target.options[e.target.selectedIndex].value as searchType);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.trim();
    setData(value);
  };

  useEffect(() => {
    if (data === "") {
      dispatch(setContacts(fetchData!));
    } else if (fetchData) {
      dispatch(searchContact({ type, data, fetchData }));
    }
  }, [data]);

  return (
    <div className="box grid grid-cols-[60%_40%] mb-[50px] w-full">
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
