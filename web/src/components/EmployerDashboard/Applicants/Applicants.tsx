import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  IconButton,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import {
  Person4,
  LogoutOutlined,
  Bookmark,
  Create,
  Person,
  AttachMoney,
  LocationOn,
} from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import {
  getCompany,
  getFullName,
  getAddress,
  getEmail,
  getDOB,
  getUserName,
} from "../../../services/userInfoService";
import {
  getApplicats,
  rejectApplication,
  getApplicantResume,
  selectCandidateForInterview,
} from "../../../services/userService";

import "./Applicants.scss";
import { injectIntl } from "react-intl";
import { styled } from "@mui/material/styles";

const styles = {
  container: {
    padding: "20px",
    // borderRadius: "10px",
    // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "15px",
    color: "#3f51b5",
    display: "flex",
    alignItems: "center",
  },
  detail: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  icon: {
    marginRight: "8px",
  },
  sectionHeading: {
    marginTop: "20px",
    marginBottom: "10px",
    color: "#3f51b5",
    display: "flex",
    alignItems: "center",
  },
  cardContainer: {
    display: "flex-block",
    flexWrap: "wrap",
    width: "100%",
  },
  card: {
    flex: 1,
    padding: "20px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  avatar: {
    width: 80,
    height: 80,
    margin: "0 auto 10px",
  },
  media: {
    height: 140,
  },
  itemList: {
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
  },
  cardMedia: {
    height: 180, // Set the height of the media (adjust as needed)
  },
};

interface Applicants {
  id?: any;
  fullName?: string;
  username?: string;
  password?: string;
  userRole?: string;
  role_id?: string;
  email?: string;
  address?: string;
  dob?: string;
  collegeName?: string;
}

const StyledPrimaryChip = styled(Chip)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  padding: "8px 16px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
const StyledErrorChip = styled(Chip)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  padding: "8px 16px",
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

const StyledSuccessChip = styled(Chip)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "10px 20px",
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

const Applicants = () => {
  const company = getCompany();
  const navigate = useNavigate();

  const { id } = useParams();

  const [applicants, setApplicants] = useState<Applicants[]>([]);
  const doLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const username: any = getUserName();
    getApplicats(username, id?.charAt(1))
      .then((res) => {
        setApplicants(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleReject = (username: any) => {
    rejectApplication(username, id?.charAt(1))
      .then((res) => {
        alert("Applicant rejected");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleViewResume = async (username: string | undefined) => {
    if (username) {
      getApplicantResume(username)
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          window.open(pdfUrl, "_blank");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleAcceptApplicant = (username: any) => {
    selectCandidateForInterview(username, id?.charAt(1))
      .then((res) => {
        alert("Applicant Accepted");
      })
      .catch((err) => console.error(err));
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5} lg={3}>
          <Card
            sx={{
              textAlign: "left",
              margin: "25px",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #c4c4c4",
              height: "70vh",
            }}
          >
            <div>
              <Button
                component={Link}
                to={"/employer/jobOffers"}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
              >
                <Bookmark sx={{ marginRight: "10px" }} /> My Jobs Offers
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                to={"/employer/addJobOffer"}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
              >
                <CreateIcon sx={{ marginRight: "10px" }} /> Add New Job
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                to={"/employer/home"}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
              >
                <PersonIcon sx={{ marginRight: "10px" }} /> Home
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
              minHeight: "70vh",
            }}
          >
            <div>
              <Box sx={styles.cardContainer}>
                {applicants?.map((offer: Applicants) => (
                  <Card
                    key={offer?.id}
                    sx={{
                      textAlign: "left",
                      margin: "10px",
                      padding: "20px",
                      borderRadius: "10px",
                      border: "1px solid #c4c4c4",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adding a subtle shadow
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)", // Slightly elevated shadow on hover
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "1.7rem", fontWeight: "bold" }}
                      >
                        {offer?.fullName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "1.2rem",
                          color: "#3f51b5",
                          marginBottom: "1rem",
                        }}
                      >
                        {offer?.email}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1.3rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LocationOn
                          sx={{ fontSize: "1.6rem", marginRight: "8px" }}
                        />
                        {offer?.address}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <SchoolIcon
                          sx={{
                            fontSize: "1.6rem",
                            marginRight: "8px",
                            color: "#868686",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "1.2rem",
                            color: "#868686",
                            marginLeft: "4px", // Add left margin for spacing
                          }}
                        >
                          {offer?.collegeName}
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{ marginTop: "1rem" }}
                      >
                        <StyledPrimaryChip
                          label="View Resume"
                          onClick={() => handleViewResume(offer?.username)}
                        />
                        <StyledErrorChip
                          label="Reject"
                          onClick={() => handleReject(offer?.username)}
                        />
                        <StyledSuccessChip
                          label="Accept Application"
                          onClick={() => handleAcceptApplicant(offer?.username)}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(Applicants);
