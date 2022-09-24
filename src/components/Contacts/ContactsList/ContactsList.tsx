import React, { FC, useMemo, useTransition } from "react";
import Box from "@mui/material/Box";
import { useGetContactsQuery } from "../../../redux/api/contactsAPI";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./ContactsList.styled";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppPaths } from "../../../variables/AppPaths";
import { ContactForm } from "../ContactForm/ContactForm";

type ListProps = {
  currentIndex: number;
  handleContactClick: (index: number) => void;
};

export const ContactsList: FC<ListProps> = (props) => {
  const { currentIndex, handleContactClick } = props;

  const [searchString, setSearchString] = React.useState("");
  const [isDialogOpened, setIsDialogOpen] = React.useState(false);
  const { data, isLoading, isError, isSuccess } = useGetContactsQuery();
  const [isPending, startTransition] = useTransition();

  const filteredContacts = useMemo(() => {
    if (!isSuccess) {
      return;
    }
    return data.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`;
      return fullName.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [data, isSuccess, searchString]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    startTransition(() => {
      setSearchString(event.currentTarget.value);
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ContactForm
        mode="create"
        currentIndex={currentIndex}
        isOpened={isDialogOpened}
        handleClose={handleDialogClose}
      />
      <Stack spacing={2}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleDialogOpen}
        >
          Добавить новый контакт
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Поиск…"
            inputProps={{ "aria-label": "Поиск" }}
            onChange={handleChange}
          />
        </Search>
        <Box sx={{ width: "100%", height: 510, overflowY: "auto" }}>
          <nav aria-label="Список контактов пользователя">
            <List>
              {isPending && (
                <Typography variant={"body1"}>Загрузка...</Typography>
              )}
              {isSuccess &&
                filteredContacts?.map((contact, index) => {
                  const fullName = `${contact.firstName} ${contact.lastName}`;
                  const notInSearchString = !fullName
                    .toLowerCase()
                    .includes(searchString.toLowerCase());
                  if (notInSearchString) {
                    return null;
                  }
                  const avatarAlt =
                    contact.firstName === "" ? "Контакт" : contact.firstName;
                  return (
                    <ListItem
                      key={contact.id}
                      disablePadding
                      onClick={() => handleContactClick(index)}
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            src={AppPaths.IMG_URL + contact.small}
                            alt={avatarAlt}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={fullName}
                          sx={{ wordBreak: "break-all" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
            {isSuccess && !data.length && (
              <Typography variant={"body1"}>
                Нет добавленных контактов.
              </Typography>
            )}
            {isLoading && (
              <Typography variant={"body1"}>Загрузка...</Typography>
            )}
            {isError && (
              <Typography variant={"body1"}>Ошибка загрузки.</Typography>
            )}
          </nav>
        </Box>
      </Stack>
    </Box>
  );
};
