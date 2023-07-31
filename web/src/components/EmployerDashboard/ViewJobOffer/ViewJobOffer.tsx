import { injectIntl } from "react-intl";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  NativeSelect,
  Chip,
} from "@mui/material";
import { getCompany, getFullName, getAddress, getEmail, getDOB} from "../../../services/userInfoService";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Bookmark
} from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from "react";
import { getJobOfferById, updateJobOfferHelper } from "../../../services/userService";

interface JobOffer {
    id?: any;
    company?: string;
    title?: string;
    contractType?: string;
    salaryRange?: string;
    description?: string;
    location?: string;
    responsibilities?: string;
    qualifications?:string;
    status: any;
  };
  

const EmployerHome = () => {
  const company = getCompany();
  const [jobOffer, setJobOffer] = useState<JobOffer>();
  const [curStatus, setCurStatus] = useState<any>();
  const navigate = useNavigate();
  const {jobId} = useParams();

  useEffect(() => {
    getJobOfferById(jobId?.charAt(1))
      .then((res) => {setJobOffer(res.data); console.log(res)})
      .catch((err) => console.log(err));
  }, []);


  const handleChangeStatus = (event: any) => {
    setCurStatus(event.target?.value)
  }

  const handleUpdateStatus = () => {
    const tempJobOffer = {...jobOffer};
    tempJobOffer.status = curStatus;
    setJobOffer(tempJobOffer as JobOffer);
    updateJobOfferHelper(jobOffer)
        .then(res => alert('Status has been updated'))
        .catch(err => console.log(err));
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
              height: "70vh",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                {jobOffer?.title}
              </Typography>
              <Typography variant="h6">
                {jobOffer?.company}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
                {jobOffer?.salaryRange}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
                {jobOffer?.location}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
              {jobOffer?.qualifications}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
              {jobOffer?.description}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
              Job Offer Status : {jobOffer?.status}
              </Typography>
              <Box sx={{ maxWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Change Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={jobOffer?.status}
                    defaultValue={jobOffer?.status}
                    label="Change Status"
                    onChange={handleChangeStatus}
                    >
                    <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
                    <MenuItem value={'Interviewing'}>Interviewing</MenuItem>
                    <MenuItem value={'Active'}>Active</MenuItem>
                    </Select>
                </FormControl>
                <Chip label="Update Status" color="success" onClick={() => handleUpdateStatus()}/>
                </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(EmployerHome);
