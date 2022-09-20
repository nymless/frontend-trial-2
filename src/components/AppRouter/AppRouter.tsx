import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { ContactsPage } from "../../pages/ContactsPage/ContactsPage";
import { App } from "../App/App";
import { AccountPage } from "../../pages/AccountPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AccountPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
};
