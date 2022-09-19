const LoginPage: React.FC = () => {
  return (
    <main className="flex justify-center items-start mx-auto h-screen text-md">
      <form className="border border-blue-400 rounded-md shadow-sm shadow-red-600 p-[15px] mt-[40px]">
        <h1 className="font-bold text-xl text-center">Вход</h1>
        <input
          className="input mt-[20px]"
          type="text"
          placeholder="Введите логин"
          name="login"
          required
        />
        <input
          className="input mt-[20px]"
          type="text"
          placeholder="Введите пароль"
          name="password"
          required
        />
        <button
          className="button mt-[20px] block mx-auto bg-blue-600"
          type="submit"
        >
          Войти
        </button>
      </form>
    </main>
  );
};
export default LoginPage;
