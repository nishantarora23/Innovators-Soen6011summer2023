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
} from "@mui/material";
import { getCompany, getFullName, getAddress, getEmail, getDOB} from "../../../services/userInfoService";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Bookmark
} from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { getMyJobOffers, deleteJobOffer } from "../../../services/userService";
import { getUserName } from "../../../services/userInfoService";

import './EmployerJobOffers.scss';
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

interface JobOffer {
  id?: any;
  company?: string;
  title?: string;
  contract_type?: string;
  salar_range?: string;
  description?: string;
  location?: string;
};

interface JobOffers{
  jobOffers: JobOffer[];
}

const EmployerJobOffers = () => {
  const company = getCompany();
  const navigate = useNavigate();

  const [myJobOffers, setJobOffers] = useState<JobOffer[]>([]);

  const jobRecommendations = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Co.",
      location: "Montreal",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      salar_range: "70,000 - 80,000",
      responsibilities: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      contract_type: "Fulltime"
    },
    {
      id: 2,
      title: "SQL Developer",
      company: "Tech Co.",
      location: "Toronto",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      salar_range: "70,000 - 80,000",
      responsibilities: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      contract_type: "Fulltime"
    },
  ];

  useEffect(() => {
    const username = JSON.stringify(getUserName());
    getMyJobOffers(username)
      .then((res) => {setJobOffers(res.data); console.log(res)})
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: string | number) => {
    deleteJobOffer(id)
      .then((res) => alert("Job Offer has been Deleted"))
      .catch(err => console.log(err));
  }

  const handleEdit = (id : string | number) => {
    navigate(`/employer/addJobOffer/${id}`);
  }

  return (
    <>
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
                to={""}
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
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
              >
                <PersonIcon sx={{ marginRight: "10px" }} /> Applicants
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
                {myJobOffers?.map((offer : JobOffer) => (
                  <Card key={offer.id} sx={styles.card}>
                    <Typography variant="subtitle1">{offer.company}</Typography>
                    <Typography variant="body2">{offer.title}</Typography>
                    <Typography className="location" variant="body2"> <LocationOnIcon/> {offer.location}</Typography>
                    <Typography variant="subtitle1"> <AttachMoneyIcon />{offer.salar_range}</Typography>
                    <Typography variant="body2">{offer.contract_type}</Typography>
                    <Typography variant="body2">{offer.description}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Edit" color="primary" onClick={() => handleEdit(offer.id)}/>
                      <Chip label="Delete" color="error" onClick={() => handleDelete(offer.id)}/>
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

export default injectIntl(EmployerJobOffers);
