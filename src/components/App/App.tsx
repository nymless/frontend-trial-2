import React from "react";
import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useCookies } from "react-cookie";
import { userApi } from "../../redux/api/userApi";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/reducers/userSlice";
import Button from "@mui/material/Button";

export const App = () => {
  const [cookie] = useCookies(["logged_in"]);

  userApi.endpoints.getCurrentUser.useQuery(null, {
    skip: cookie.logged_in !== "true",
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);
  const isAuth = Boolean(user);

  const [, setCookie] = useCookies(["logged_in"]);

  const handleLogoutClick = () => {
    setCookie("logged_in", "false", {
      maxAge: 3600,
    });
    dispatch(logout());
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <Container>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <div className={styles.logo}>Takeoff-Staff</div>
              <p className={styles.info}>
                Тестовое задание на вакансию React разработчика.
              </p>
            </Grid>
            <Grid item>
              {isAuth ? (
                <Button
                  variant="contained"
                  onClick={handleLogoutClick}
                  sx={{ fontWeight: "bold" }}
                >
                  Выйти
                </Button>
              ) : (
                <Link className={styles.link} to={"/login"}>
                  <Button variant="contained" sx={{ fontWeight: "bold" }}>
                    Войти
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Container>
      </header>
      <nav className={styles.nav}>
        <Container>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Grid container spacing={4}>
              <Grid item>
                <Link className={styles.link} to={"/"}>
                  Главная
                </Link>
              </Grid>
              <Grid item>
                <Link className={styles.link} to={"/contacts"}>
                  Контакты
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </nav>
      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className={styles.footer}>
        <Container>
          {"Выполнил "}
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
