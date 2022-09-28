import { Route, Routes } from "react-router-dom";
import ContactsPage from "../pages/ContactsPage";
import AuthPage from "../pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/contacts/list" element={<ContactsPage />} />
      <Route path="/contacts" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
