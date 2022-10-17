import { IUser } from "../models/models";
import { SubmitHandler, FormProvider, UseFormReturn } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const ContactForm: React.FC<{
  onSubmit: SubmitHandler<IUser>;
  methods: UseFormReturn;
  children: React.ReactNode;
}> = (props) => {
  const { onSubmit, methods, children } = props;

  const { control, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className="box mt-[40px] min-w-[300px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
      </form>
      <DevTool control={control} />
    </FormProvider>
  );
};
export default ContactForm;
