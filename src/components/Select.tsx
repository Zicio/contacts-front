import { ChangeEventHandler } from "react";
import { Sort } from "../models/models";

const Select: React.FC<{
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}> = (props) => {
  const { onChange, options } = props;
  return (
    <select className="select" onChange={onChange}>
      {options.map((option) => (
        <option value={option} key={options.indexOf(option)}>
          {Sort[option as keyof typeof Sort]}
        </option>
      ))}
    </select>
  );
};
export default Select;
