const PopupForm: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;

  return (
    <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 bg-black bg-opacity-50">
      <article className="w-fit">{children}</article>
    </div>
  );
};

export default PopupForm;
