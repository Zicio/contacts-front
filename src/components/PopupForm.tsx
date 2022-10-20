import { SubmitHandler, useForm } from "react-hook-form";
import { IContact } from "../models/models";
import { useCreateNewContactMutation } from "../store/api/contacts.api";
import Form from "./Form";
import Input from "./Input";
import Loader from "./Loader";
import Notification from "./Notification";

const PopupForm: React.FC<{ handleSubmit: SubmitHandler<IContact> }> = (
  props
) => {
  const { handleSubmit } = props;
  const [
    ,
    { data: createData, isLoading: isCreateLoading, isError: isCreateError },
  ] = useCreateNewContactMutation();

  const methods = useForm<IContact>({
    mode: "onChange",
  });
  const {
    formState: { errors, isValid },
    reset,
  } = methods;

  return (
    <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 bg-black bg-opacity-50">
      <article className="w-fit">
        <Form
          onSubmit={handleSubmit}
          methods={methods}
          title="Создать новый контакт"
        >
          <Input name="name" type="text" active={isCreateLoading} />
          <Notification message={errors.name?.message} />
          <Input name="surname" type="text" active={isCreateLoading} />
          <Notification message={errors.surname?.message} />
          <Input name="city" type="text" active={isCreateLoading} />
          <Notification message={errors.city?.message} />
          <Input name="tel" type="tel" active={isCreateLoading} />
          <small>Формат +79********</small>
          <Notification message={errors.tel?.message} />
          {isCreateLoading ? (
            <Loader border={false} />
          ) : (
            <button
              className={`button text-xl ${
                !isValid && "opacity-50 hover:shadow-none"
              } mt-[20px] block mx-auto mb-[20px] button-fuchsia`}
              type="submit"
              disabled={!isValid}
            >
              Создать
            </button>
          )}
        </Form>
      </article>
    </div>
  );
};

export default PopupForm;
