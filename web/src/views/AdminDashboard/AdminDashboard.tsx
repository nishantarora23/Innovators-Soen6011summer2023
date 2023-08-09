import React, { useState } from "react";
import { injectIntl } from "react-intl";
// import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import "./AdminDashboard.scss";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

// Pages
import AdminHome from "./AdminHome";
import JobPosting from "./JobPosting";
import CandidateApplications from "./CandidateApplications";
import {
  AllInbox,
  Checklist,
  Home,
  LogoutOutlined,
  Person4,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { indigo } from "@mui/material/colors";
import { getFullName } from "../../services/userInfoService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const doLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Grid
        container
        className="userProfile-container end-container"
        sx={{
          justifyContent: "flex-end",
          marginTop: "-60px",
          zIndex: 1200,
        }}
      >
        <Avatar
          sx={{
            bgcolor: indigo[100],
            width: "40px",
            height: "40px",
            marginTop: "-5px",
            marginRight: "10px",
          }}
        >
          <Person4 color="primary" />
        </Avatar>
        <Typography variant="h6" sx={{ color: indigo[100] }}>
          {getFullName() || "Admin"}
        </Typography>
        <IconButton
          color="secondary"
          component={Link}
          to={"/"}
          onClick={doLogout}
          sx={{
            marginRight: "50px",
            color: indigo[100],
            marginTop: "-10px",
            marginLeft: "10px",
          }}
        >
          <LogoutOutlined
            sx={{
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: "10px",
        }}
      >
        <Grid item xs={12} sm={6} md={5} lg={3}>
          <Card
            className="sidemenu"
            sx={{
              textAlign: "left",
              margin: "25px",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #c4c4c4",
              height: "calc(100vh - 350px)",
            }}
          >
            {[
              { text: "Home", icon: Home },
              { text: "Job Posting", icon: AllInbox },
              { text: "Candidate Applications", icon: Checklist },
            ].map(({ text, icon }) => {
              const Icon = icon;
              return (
                <div key={text} className="menus">
                  <Button
                    color="primary"
                    sx={{ fontSize: "0.8rem" }}
                    onClick={() => setSelectedView(text)}
                  >
                    <Icon sx={{ marginRight: "10px" }} /> {text}
                  </Button>
                </div>
              );
            })}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={9}>
          <Card
            sx={{
              textAlign: "left",
              margin: "25px 25px 25px 0",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #c4c4c4",
              height: "calc(100vh - 350px)",
              overflowY: "auto",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>{getPageContent(selectedView)}</Box>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default injectIntl(AdminDashboard);
