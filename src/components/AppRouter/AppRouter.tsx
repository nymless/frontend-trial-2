import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ContactsPage } from "../../pages/ContactsPage/ContactsPage";
import { App } from "../App/App";
import { AccountPage } from "../../pages/AccountPage/AccountPage";
import { PrivateRoutes } from "../PrivateRoutes/PrivateRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AccountPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<AccountPage />} />
      </Route>
    </Routes>
  );
};
