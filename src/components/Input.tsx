import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { IValidationRules, Warning } from "../models/models";

const Input: React.FC<{
  name: string;
  type: string;
  active: boolean;
  data?: string;
}> = (props) => {
  const { name, type, active, data } = props;
  const { register, setValue }: UseFormReturn<FieldValues> = useFormContext();
  const getValidationRules = (nameField: string) => {
    switch (nameField) {
      case "password":
        return {
          regExp: /[A-Za-z0-9]/g,
          minLength: 4,
          maxLength: 12,
        };
      case "tel":
        return {
          regExp: /^((\+7)+([0-9]){10})$/,
          minLength: 12,
          maxLength: 12,
        };
      default:
        return {
          regExp: /[а-яА-ЯёЁA-Za-z]/g,
          minLength: 3,
          maxLength: 12,
        };
    }
  };
  const rules: IValidationRules = getValidationRules(name);

  if (data) {
    setValue(name, data);
  }

  return (
    <input
      className="input mt-[20px] w-full"
      type={type}
      placeholder={"Введите " + Warning[name as keyof typeof Warning]}
      disabled={active}
      {...register(name, {
        required: "Поле обязательно к заполнению!",
        pattern: {
          value: rules.regExp,
          message: "Неверный формат",
        },
        minLength: {
          value: rules.minLength,
          message: `Минимум ${rules.minLength} символа`,
        },
        maxLength: {
          value: rules.maxLength,
          message: `Максимум ${rules.maxLength} символов`,
        },
      })}
    />
  );
};

export default Input;
