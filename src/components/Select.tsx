import { ChangeEventHandler } from "react";
import { SelectType } from "../models/models";

const Select: React.FC<{
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}> = (props) => {
  const { onChange, options } = props;
  return (
    <select className="select" onChange={onChange}>
      {options.map((option) => (
        <option value={option} key={options.indexOf(option)}>
          {SelectType[option as keyof typeof SelectType]}
        </option>
      ))}
    </select>
  );
};
export default Select;
