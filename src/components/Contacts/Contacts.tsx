import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ContactCard } from "./ContactCard/ContactCard";
import { ContactsList } from "./ContactsList/ContactsList";

export const Contacts = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleContactClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid spacing={4} container>
        <Grid item xs={3.5}>
          <ContactsList
            currentIndex={currentIndex}
            handleContactClick={handleContactClick}
          />
        </Grid>
        <Grid item xs={7.5}>
          <ContactCard currentIndex={currentIndex} />
        </Grid>
      </Grid>
    </Box>
  );
};
