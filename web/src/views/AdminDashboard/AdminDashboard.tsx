import React, { useState } from "react";
import { injectIntl } from "react-intl";
import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import "./AdminDashboard.scss";
import { Person, Store } from "@mui/icons-material";
import StatCard from "../../components/StatCard/StatCard";

type Props = {
  intl: any;
};

const Home = () => {
  return (
    <div className="pageContainer">
      <h1>Hello, Admin!</h1>
      <Box display="flex" gap="24px">
        <StatCard title="Students Enrolled" value={500} icon={Person} />
        <StatCard title="Employers Registered" value={500} icon={Store} />
      </Box>
    </div>
  );
};

const Page = () => {
  return (
    <div className="pageContainer">
      <h1>Page to be done.</h1>
    </div>
  );
};

const AdminDashboard = ({ intl }: Props) => {
  const [selectedView, setSelectedView] = useState("Home");
  return (
    <>
      <MenuBar
        title={intl.formatMessage({ id: "global.app_title" })}
        noBtn={true}
      />
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            zIndex: -1,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {["Home", "Job Posting", "Candidate Applications"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={text === selectedView}
                  onClick={() => setSelectedView(text)}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      {selectedView === "Home" ? <Home /> : <Page />}
      <Footer />
    </>
  );
};

export default injectIntl(AdminDashboard);
