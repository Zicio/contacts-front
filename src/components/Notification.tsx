const Notification: React.FC<{
  message: string | undefined;
}> = (props) => {
  const { message } = props;
  return (
    <div className="min-h-[30px] text-red-600 italic">
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
