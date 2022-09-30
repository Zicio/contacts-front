import { useFormContext } from "react-hook-form";
import { Warning } from "../models/models";

const Input: React.FC<{ name: string }> = (props) => {
  const { name } = props;
  const { register } = useFormContext();

  return (
    <input
      className="input mt-[20px] w-full"
      type="text"
      placeholder={"Введите " + Warning[name as keyof typeof Warning]}
      {...register(name, {
        required: "Поле обязательно к заполнению!",
        minLength: {
          value: 5,
          message: "Минимум 5 символов",
        },
        maxLength: {
          value: 10,
          message: "Максимум 10 символов",
        },
        pattern: {
          value: /[A-Za-z0-9]/g,
          message: "Только латинские буквы",
        },
      })}
    />
  );
};

export default Input;
