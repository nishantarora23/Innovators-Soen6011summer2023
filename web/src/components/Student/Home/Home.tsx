import { injectIntl } from "react-intl";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Input,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  getFullName,
  getUserName,
  getEmail,
  getUserRole,
} from "../../../services/userInfoService";
import { Link, useNavigate } from "react-router-dom";
import {
  Article,
  Bookmark,
  Notifications,
  AssignmentTurnedIn,
  Person4,
  LogoutOutlined,
  CloudUpload,
  Home,
} from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { useState } from "react";
import JobsList from "../../Jobs/Jobs";
import MyJobs from "../../MyJobs/MyJobs";
import StudentDetails from "../Details/StudentDetails";
import { QUICK_CV_URL, API_URL } from "../../../constants";
import axios from "axios";
import "./Home.css";

export interface ResumeAlert {
  open: boolean;
  severity: AlertColor;
  message: string;
}

const StudentHome = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("home");
  const [resumeAlert, setResumeAlert] = useState<ResumeAlert>({
    open: false,
    severity: "info",
    message: "",
  });

  const doLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (event: any) => {
    console.log(event);
    if (event?.target?.files?.length) {
      const formData = new FormData();
      formData.append("username", getUserName() ?? "");
      formData.append("fullName", getFullName() ?? "");
      formData.append("email", getEmail() ?? "");
      formData.append("userRole", getUserRole() ?? "");
      formData.append("resume", event.target.files[0]);
      axios
        .post(`${API_URL}/upload-resume/${getUserName()}`, formData)
        .then(() => {
          setResumeAlert({
            open: true,
            severity: "success",
            message: "Resume uploaded sucessfully.",
          });
        })
        .catch((error) => {
          setResumeAlert({
            open: true,
            severity: "error",
            message: "Resume uploaded failed.",
          });
          console.log(error);
        });
    }
  };

  return (
    <>
      <Grid
        container
        className="userProfile-container end-container"
        sx={{
          justifyContent: "flex-end",
          marginTop: "-60px",
          zIndex: 9999,
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
          {getFullName()}
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
            <div className="menus">
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setScreen("home");
                }}
              >
                <Home sx={{ marginRight: "10px" }} /> Home
              </Button>
            </div>
            <div className="menus">
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setScreen("my-jobs");
                }}
              >
                <Bookmark sx={{ marginRight: "10px" }} /> My Jobs
              </Button>
            </div>
            <div className="menus">
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setScreen("jobs");
                }}
              >
                <Notifications sx={{ marginRight: "10px" }} /> Job Listings
              </Button>
            </div>
            <div className="menus">
              <Button
                component={Link}
                to={""}
                color="primary"
                onClick={() => {
                  window.open(QUICK_CV_URL, "_blank");
                }}
                sx={{ fontSize: "1.1rem" }}
              >
                <Article sx={{ marginRight: "10px" }} /> Resume Builder
              </Button>
            </div>
            <div className="menus">
              <Button
                component={Link}
                to={""}
                color="primary"
                onClick={handleFileUpload}
                sx={{ fontSize: "1.1rem" }}
              >
                <CloudUpload sx={{ marginRight: "10px" }} /> Upload a Resume
              </Button>
              <input
                id="fileInput"
                className="custom-file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                hidden
              />
              <Snackbar
                open={resumeAlert.open}
                autoHideDuration={3000}
                onClose={() => {
                  setResumeAlert({
                    open: false,
                    severity: "info",
                    message: "",
                  });
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{
                  marginTop: "5rem",
                }}
              >
                <MuiAlert severity={resumeAlert.severity}>
                  {resumeAlert.message}
                </MuiAlert>
              </Snackbar>
            </div>
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
            {screen === "home" && (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <StudentDetails />
                </Box>
              </>
            )}
            {screen === "my-jobs" && (
              <>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "1.75rem",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Applied Jobs
                  </Typography>
                  <Typography sx={{ color: "#868686" }}>
                    Jobs you have applied
                  </Typography>
                  <MyJobs></MyJobs>
                </CardContent>
              </>
            )}
            {screen === "jobs" && (
              <>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "1.75rem",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Still Hiring
                  </Typography>
                  <Typography sx={{ color: "#868686" }}>
                    Jobs you may have missed
                  </Typography>
                  <JobsList></JobsList>
                </CardContent>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(StudentHome);
