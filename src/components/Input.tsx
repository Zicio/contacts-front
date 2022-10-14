import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { Warning } from "../models/models";

const Input: React.FC<{ name: string; type: string; active: boolean }> = (
  props
) => {
  const { name, type, active } = props;
  const { register }: UseFormReturn<FieldValues> = useFormContext();
  const minLength: number = 4;
  const maxLength: number = 10;
  const reg: RegExp = name === "password" ? /[A-Za-z0-9]/g : /[A-Za-z]/g;

  return (
    <input
      className="input mt-[20px] w-full"
      type={type}
      placeholder={"Введите " + Warning[name as keyof typeof Warning]}
      disabled={active}
      {...register(name, {
        required: "Поле обязательно к заполнению!",
        pattern: {
          value: reg,
          message: "Только латинские буквы",
        },
        minLength: {
          value: minLength,
          message: `Минимум ${minLength} символа`,
        },
        maxLength: {
          value: maxLength,
          message: `Максимум ${maxLength} символов`,
        },
      })}
    />
  );
};

export default Input;
