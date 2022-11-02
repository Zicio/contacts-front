import { ChangeEventHandler } from "react";
import { useSelector } from "react-redux";
import { IContact } from "../models/models";
import { RootState } from "../store/store";
import Select from "./Select";

const Search: React.FC = () => {
  const contacts: IContact[] = useSelector(
    (state: RootState) => state.contacts
  );

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    // switch (e.target.options[e.target.selectedIndex].value) {
    //   case "ascendingAlphabet": //TODO
    //       arr.sort((a, b) => {
    //         console.log(a);
    //         if (a.name > b.name) {
    //           return 1;
    //         }
    //         if (a.name < b.name) {
    //           return -1;
    //         }
    //         return 0;
    //       });
    //       break;
    //     case "descendingAlphabet":
    //       arr.sort((a, b) => {
    //         console.log(a);
    //         if (a.name > b.name) {
    //           return -1;
    //         }
    //         if (a.name < b.name) {
    //           return 1;
    //         }
    //         return 0;
    //       });
    //       break;
    //   }
    //   dispatch(setContacts(arr));
  };

  return (
    <div className="box">
      <input type="text" placeholder="Поиск..." />
      <Select
        options={["name", "surname", "city", "tel"]}
        onChange={handleChange}
      />
    </div>
  );
};
export default Search;
