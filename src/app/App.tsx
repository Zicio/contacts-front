import { Route, Routes } from "react-router-dom";
import ContactsPage from "../pages/ContactsPage";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
