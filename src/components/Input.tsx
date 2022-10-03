import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { Warning } from "../models/models";

const Input: React.FC<{ name: string; active: boolean }> = (props) => {
  const { name, active } = props;
  const { register }: UseFormReturn<FieldValues> = useFormContext();
  const minLength: number = 4;
  const maxLength: number = 10;

  return (
    <input
      className="input mt-[20px] w-full"
      type="text"
      placeholder={"Введите " + Warning[name as keyof typeof Warning]}
      disabled={active}
      {...register(name, {
        required: "Поле обязательно к заполнению!",
        minLength: {
          value: minLength,
          message: `Минимум ${minLength} символа`,
        },
        maxLength: {
          value: maxLength,
          message: `Максимум ${maxLength} символов`,
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
