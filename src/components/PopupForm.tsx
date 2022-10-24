import { useDispatch } from "react-redux";
import { deactivate } from "../store/popupSlice";

const PopupForm: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;

  const dispatch = useDispatch();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dispatch(deactivate());
  };

  return (
    <div
      className="fixed flex justify-center items-center w-full h-screen top-0 left-0 bg-black bg-opacity-50"
      onClick={handleClick}
    >
      <article className="w-fit" onClick={(e) => e.stopPropagation()}>
        {children}
      </article>
    </div>
  );
};

export default PopupForm;
