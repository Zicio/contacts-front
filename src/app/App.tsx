import { Route, Routes } from "react-router-dom";
import ContactsPage from "../pages/ContactsPage";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/contacts/list" element={<ContactsPage />} />
      <Route path="/contacts" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
