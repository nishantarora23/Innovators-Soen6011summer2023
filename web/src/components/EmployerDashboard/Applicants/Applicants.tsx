import { injectIntl } from "react-intl";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";
import { getCompany, getFullName, getAddress, getEmail, getDOB} from "../../../services/userInfoService";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Person4,
LogoutOutlined,
  Bookmark
} from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { indigo } from "@mui/material/colors";

import { getMyJobOffers, deleteJobOffer, getApplicats, getApplicantResume, selectCandidateForInterview, deleteApplication, rejectApplication } from "../../../services/userService";
import { getUserName } from "../../../services/userInfoService";

import './Applicants.scss';
import { useEffect, useState } from "react";
import axios from "axios";

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
    width: '100%'
  },
  card: {
    flex: 1,
    padding: "20px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer"
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
  user_role?: string;
  role_id?: string;
  email?: string;
  address?: string;
  dob?: string;
  college_name?: string;
};


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
    const username :any = getUserName();
    getApplicats(username, id?.charAt(1))
      .then((res) => {
        setApplicants(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleReject = (username: any) => {
    rejectApplication(username, id?.charAt(1))
        .then((res) => {console.log(res); window.location.reload()})
        .catch(err => console.error(err))
  }

  const handleViewResume =  async (username : string | undefined) => {
    if(username){
      getApplicantResume(username)
        .then(res => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          window.open(pdfUrl, '_blank');
        })
        .catch(err => console.error(err));
    }
  }

  const handleAcceptApplicant = (username : any) => {
    selectCandidateForInterview(username, id?.charAt(1))
        .then((res) => console.log(res))
        .catch(err => console.error(err))
  }

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
      <Grid container spacing={1}>
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
                {applicants?.map((offer : Applicants) => (
                  <Card key={offer?.id} sx={styles.card}>
                    <Typography variant="subtitle1">{offer?.fullName}</Typography>
                    <Typography variant="body2">{offer?.user_role}</Typography>
                    <Typography className="location" variant="body2"> {offer?.email}</Typography>
                    <Typography variant="subtitle1"> <LocationOnIcon/>{offer?.address}</Typography>
                    <Typography variant="body2">{offer?.dob}</Typography>
                    <Typography variant="body2">{offer?.college_name}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label="View Resume" color="primary" onClick={() => handleViewResume(offer?.username)}/>
                      <Chip label="Reject" color="warning" onClick={() => handleReject(offer?.username)}/>
                      <Chip label="Accept Application" color="success" onClick={() => handleAcceptApplicant(offer?.username)}/>
                    </Stack>
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