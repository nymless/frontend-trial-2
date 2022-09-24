import React, { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useCreateContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../../../redux/api/contactsAPI";

type ContactFormProps = {
  mode: "create" | "modify";
  currentIndex: number;
  isOpened: boolean;
  handleClose: () => void;
};

const maxLengthError = "Допустимо не более 255 символов";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(255, maxLengthError)
    .required("Необходимо указать имя"),
  lastName: yup.string().max(255, maxLengthError),
  email: yup.string().max(255, maxLengthError),
  github: yup.string().max(255, maxLengthError),
  telegram: yup.string().max(255, maxLengthError),
  info: yup.string().max(255, maxLengthError),
});

export const ContactForm: FC<ContactFormProps> = (props) => {
  const { mode, currentIndex, isOpened, handleClose } = props;

  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const { data } = useGetContactsQuery();

  const isModifyMode = data && mode === "modify";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: isModifyMode ? data[currentIndex].firstName : "",
      lastName: isModifyMode ? data[currentIndex].lastName : "",
      email: isModifyMode ? data[currentIndex].email : "",
      github: isModifyMode ? data[currentIndex].github : "",
      telegram: isModifyMode ? data[currentIndex].telegram : "",
      info: isModifyMode ? data[currentIndex].info : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      if (isModifyMode) {
        const id = data[currentIndex].id;
        const contact = { ...values, id };
        updateContact(contact);
      } else {
        createContact(values);
      }
      handleClose();
      action.resetForm();
    },
  });

  const handleSubmit = () => {
    formik.submitForm();
  };

  const title = isModifyMode ? "Редактировать" : "Создать";
  const text = isModifyMode
    ? 'Нажмите "Подтвердить", когда закончите редактирование контакта.'
    : 'Нажмите "Подтвердить", когда закончите ввод данных контакта.';

  return (
    <Dialog open={isOpened} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <DialogContentText>* Поле "Имя" обязательно.</DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            id="firstName"
            label="Имя"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.firstName)}
            helperText={formik.errors.firstName}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Фамилия"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.lastName)}
            helperText={formik.errors.lastName}
          />
          <TextField
            margin="dense"
            id="email"
            label="e-mail"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            margin="dense"
            id="github"
            label="Github"
            fullWidth
            value={formik.values.github}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.github)}
            helperText={formik.errors.github}
          />
          <TextField
            margin="dense"
            id="telegram"
            label="Telegram"
            fullWidth
            value={formik.values.telegram}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.telegram)}
            helperText={formik.errors.telegram}
          />
          <TextField
            margin="dense"
            id="info"
            label="Информация"
            fullWidth
            value={formik.values.info}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.info)}
            helperText={formik.errors.info}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
};
