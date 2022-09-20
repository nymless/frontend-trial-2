import React from "react";
import styles from "./ContactsPage.module.scss";
import { Contacts } from "../../features/contacts/Contacts";

export const ContactsPage = () => {
  return (
    <div className={styles.ContactsPage}>
      <h2 className={styles.heading}>Контакты</h2>
      <Contacts />
    </div>
  );
};
