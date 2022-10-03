const Notification: React.FC<{
  message: any | undefined;
}> = (props) => {
  const { message } = props;
  return (
    <div className="min-h-[30px] max-w-[250px] text-red-600 italic">
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
