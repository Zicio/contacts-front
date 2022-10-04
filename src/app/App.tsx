import { Navigate, Route, Routes } from "react-router-dom";
import ListPage from "../pages/ListPage";
import AuthPage from "../pages/AuthPage";

function App() {
  return (
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
  );
}

export default App;
