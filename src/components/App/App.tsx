import React from "react";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export const App = () => {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <Container>
          <div className={styles.logo}>Takeoff-Staff</div>
          <p className={styles.info}>
            Тестовое задание на вакансию React разработчика.
          </p>
        </Container>
      </header>
      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className={styles.footer}>
        <Container>
          Выполнил{" "}
          <a
            className={styles.link}
            href="https://github.com/nymless"
            target="_blank"
            rel="noreferrer"
          >
            Иван Бакланов
          </a>
        </Container>
      </footer>
    </div>
  );
};
