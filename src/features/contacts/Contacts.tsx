import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetContactsQuery } from "./contactsAPI";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `вкладка-${index}`,
    "aria-controls": `панель-вкладок-${index}`,
  };
}

export const Contacts = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useGetContactsQuery();

  return (
    <div>
      <Box sx={{ flexGrow: 1, display: "flex", height: "600px" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Вертикальные вкладки с панелями"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {data?.map((contact) => {
            return (
              <Tab label={contact.name} {...a11yProps(0)} key={contact.id} />
            );
          })}
        </Tabs>
        {data?.map((contact, index) => {
          return (
            <TabPanel value={value} index={index} key={contact.id}>
              {contact.name}
            </TabPanel>
          );
        })}
      </Box>
    </div>
  );
};
