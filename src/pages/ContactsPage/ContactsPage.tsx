import React from "react";
import { Contacts } from "../../components/Contacts/Contacts";
import Typography from "@mui/material/Typography";

export const ContactsPage = () => {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Контакты
      </Typography>
      <Contacts />
    </div>
  );
};
