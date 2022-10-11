import { Navigate, Route, Routes } from "react-router-dom";
import ListPage from "../pages/ListPage";
import AuthPage from "../pages/AuthPage";

function App() {
  return (
    <div className="bg-gradient-to-tr from-black via-fuchsia-700 to-sky-400 h-full">
      <Routes>
        <Route
          path="/contacts"
          element={
            <>
              <Navigate to={"/contacts/auth"} replace />
            </>
          }
        />
        <Route path="/contacts/auth" element={<AuthPage />} />
        <Route path="/contacts/:user" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
