import React, { useState } from "react";
import { injectIntl } from "react-intl";
// import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import "./AdminDashboard.scss";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

// Pages
import AdminHome from "./AdminHome";
import JobPosting from "./JobPosting";
import CandidateApplications from "./CandidateApplications";

type Props = {
  intl: any;
};

const EmptyPage = ({ selectedView }: { selectedView: string }) => {
  return (
    <div className="pageContainer">
      <h1>{selectedView}</h1>
      <p>No content available for this page.</p>
    </div>
  );
};

const AdminDashboard = ({ intl }: Props) => {
  const [selectedView, setSelectedView] = useState("Home");

  const getPageContent = (selectedView: string) => {
    switch (selectedView) {
      case "Home":
        return <AdminHome />;
      case "Job Posting":
        return <JobPosting />;
      case "Candidate Applications":
        return <CandidateApplications />;
      default:
        return <EmptyPage selectedView={selectedView} />;
    }
  };

  const logout = () => {
    console.log("Logout!");
  };

  return (
    <>
      {/* <MenuBar
        title={intl.formatMessage({ id: "global.app_title" })}
        noBtn={true}
      /> */}
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
          {["", "Home", "Job Posting", "Candidate Applications"].map(
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
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {getPageContent(selectedView)}
    </>
  );
};

export default injectIntl(AdminDashboard);
