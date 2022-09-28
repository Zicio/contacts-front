import { FieldError } from "react-hook-form";

const Notification: React.FC<{ name: FieldError | undefined }> = (props) => {
  const { name } = props;
  return (
    <div className="min-h-[30px] text-red-600 italic">
      {name && <p>{name.message}</p>}
    </div>
  );
};

export default Notification;
