import React from "react";

export interface AlertDialogConfig {
  open: boolean;
  handleAlertClose: () => void;
}

export const useAlertDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  const config = { open, handleAlertClose };

  return { handleAlertOpen, config };
};
