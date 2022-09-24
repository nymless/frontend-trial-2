import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const LoginPage = () => {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Авторизация
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <Typography variant="body1">
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {"Логин: "}
              </Box>
              user-123@email.com
            </Typography>
            <Typography variant="body1">
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {"Пароль: "}
              </Box>
              qwerty-123
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};
