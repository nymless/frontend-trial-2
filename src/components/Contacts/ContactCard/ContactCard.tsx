import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useGetContactsQuery,
  useRemoveContactMutation,
} from "../../../redux/api/contactsAPI";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import placeholder from "../../../assets/Portrait_Placeholder.png";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { ContactForm } from "../ContactForm/ContactForm";
import { AppPaths } from "../../../variables/AppPaths";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { useAlertDialog } from "../AlertDialog/hooks/useAlertDialog";

type ContactCardProps = {
  currentIndex: number;
};

export const ContactCard: FC<ContactCardProps> = (props) => {
  const { currentIndex } = props;

  const [isDialogOpened, setIsDialogOpen] = React.useState(false);
  const { data, isLoading, isError } = useGetContactsQuery();
  const [removeContact] = useRemoveContactMutation();
  const { handleAlertOpen, config } = useAlertDialog();

  if (isLoading) {
    return <Typography variant={"body1"}>Загрузка...</Typography>;
  }
  if (isError) {
    return <Typography variant={"body1"}>Ошибка загрузки.</Typography>;
  }
  if (!data?.length || !data[currentIndex]) {
    return <Typography variant={"body1"}>Контакт не выбран.</Typography>;
  }

  const contact = data[currentIndex];
  const hasNoPhoto = contact.photo === "";
  const photo = hasNoPhoto ? placeholder : AppPaths.IMG_URL + contact.photo;
  const fullName = `${contact.firstName} ${contact.lastName}`;

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const deleteContact = () => {
    handleAlertOpen();
  };

  const onAlertConfirmed = () => {
    removeContact(contact.id);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AlertDialog config={config} onConfirm={onAlertConfirmed} />
      <ContactForm
        mode="modify"
        currentIndex={currentIndex}
        isOpened={isDialogOpened}
        handleClose={handleDialogClose}
      />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Box
            component="img"
            sx={{
              width: "100%",
              borderRadius: "10%",
            }}
            src={photo}
            alt="Фото"
          />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={1}>
            <Typography variant={"h4"} fontWeight="bold">
              {fullName}
            </Typography>
            <Typography variant={"body1"}>
              {"E-mail: "}
              <Link
                href={"mailto:" + contact.email}
                target="_blank"
                rel="noopener"
              >
                {contact.email}
              </Link>
            </Typography>
            <Typography variant={"body1"}>
              {"GitHub: "}
              <Link href={contact.github} target="_blank" rel="noopener">
                {contact.github}
              </Link>
            </Typography>
            <Typography variant={"body1"}>
              {"Telegram: "}
              <Link href={contact.telegram} target="_blank" rel="noopener">
                {contact.telegram}
              </Link>
            </Typography>
            <Typography
              variant={"body1"}
            >{`Информация: ${contact.info}`}</Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  size="small"
                  color="info"
                  variant="contained"
                  onClick={handleDialogOpen}
                >
                  Редактировать
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  color="warning"
                  variant="contained"
                  onClick={deleteContact}
                >
                  Удалить
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
