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
import { getFullName, getUserInfo } from "../../../services/userInfoService";
import { Link, useNavigate } from "react-router-dom";
import {
  Article,
  Bookmark,
  Notifications,
  AssignmentTurnedIn,
  Person4,
  LogoutOutlined,
} from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { useState } from "react";
import JobsList from "../../Jobs/Jobs";
import StudentDetails from "../Details/StudentDetails";
// import { QUICK_CV_URL } from "../../../constants";

const StudentHome = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("home");

  const doLogout = () => {
    localStorage.clear();
    navigate("/login");
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
            sx={{
              textAlign: "left",
              margin: "25px",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #c4c4c4",
              height: "calc(100vh - 350px)",
            }}
          >
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setScreen("home");
                }}
              >
                <Bookmark sx={{ marginRight: "10px" }} /> Home
              </Button>
            </div>
            <div>
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
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setScreen("jobs");
                }}
              >
                <Notifications sx={{ marginRight: "10px" }} /> Job alerts
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setScreen("skills");
                }}
              >
                <AssignmentTurnedIn sx={{ marginRight: "10px" }} /> Skill
                assessments
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                onClick={() => {
                  // window.open(QUICK_CV_URL, "_blank");
                }}
                sx={{ fontSize: "1.1rem" }}
              >
                <Article sx={{ marginRight: "10px" }} /> Resume Builder
              </Button>
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
