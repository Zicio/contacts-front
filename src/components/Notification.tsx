import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { FieldError } from "react-hook-form";

const Notification: React.FC<{
  message: any | undefined;
}> = (props) => {
  const { message } = props;
  return (
    <div className="min-h-[30px] text-red-600 italic">
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
