import React, { FC, useEffect } from "react";
import styles from "./LoginForm.module.scss";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { useLoginUserMutation } from "../../redux/api/authApi";
import Container from "@mui/material/Container";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";

interface LoginFormProps {}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введён не корректный email адрес")
    .required("Email адрес должен быть указан обязательно"),
  password: yup.string().required("Пароль должен быть указан обязательно"),
});

export type LoginValues = {
  email: string;
  password: string;
};

const LoginForm: FC<LoginFormProps> = () => {
  const [loginUser, { isSuccess }] = useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      email: "user-123@email.com",
      password: "qwerty-123",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      loginUser(values);
      actions.resetForm();
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <form
      className={styles.LoginForm}
      onSubmit={formik.handleSubmit}
      data-testid="LoginForm"
    >
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Пароль"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Container>
        <Button type="submit" variant="contained">
          Подтвердить
        </Button>
      </Container>
    </form>
  );
};

export default LoginForm;
