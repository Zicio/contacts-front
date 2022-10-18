import { IContact, IUser } from "../models/models";
import { SubmitHandler, FormProvider, UseFormReturn } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Form: React.FC<{
  onSubmit: SubmitHandler<IUser> | SubmitHandler<IContact>;
  methods: UseFormReturn;
  title: string;
  children: React.ReactNode;
}> = (props) => {
  const { onSubmit, methods, title, children } = props;

  const { control, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className="box mt-[40px] min-w-[300px] max-w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-3xl text-center text-fuchsia-600">
          {title}
        </h1>
        {children}
      </form>
      {/* <DevTool control={control} /> */}
    </FormProvider>
  );
};
export default Form;
