import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertDialogConfig } from "./hooks/useAlertDialog";

type AlertDialogProps = {
  config: AlertDialogConfig;
  onConfirm: () => void;
};

export const AlertDialog: FC<AlertDialogProps> = (props) => {
  const {
    onConfirm,
    config: { open, handleAlertClose },
  } = props;

  const handleConfirm = () => {
    onConfirm();
    handleAlertClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleAlertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Удаление</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Подтвердите удаление контакта, нажав "Подтверждаю".
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAlertClose}>Отмена</Button>
        <Button onClick={handleConfirm}>Подтверждаю</Button>
      </DialogActions>
    </Dialog>
  );
};
