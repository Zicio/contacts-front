const ErrorWindow: React.FC = () => {
  return (
    <div className="bg-yellow-500 border-[5px] border-solid border-gray-800 rounded-md shadow-lg shadow-black p-[15px] m-auto flex flex-col items-center font-bold text-xl">
      <span>Произошла ошибка</span>
      <span>Перезагрузите страницу</span>
    </div>
  );
};

export default ErrorWindow;
