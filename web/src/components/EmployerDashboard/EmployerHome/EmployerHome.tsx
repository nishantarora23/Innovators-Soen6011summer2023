import { injectIntl } from "react-intl";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { getCompany, getFullName, getAddress, getEmail, getDOB} from "../../../services/userInfoService";
import { Link, useNavigate } from "react-router-dom";
import {
  Bookmark
} from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';

const StudentHome = () => {
  const company = getCompany();
  const navigate = useNavigate();
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
              height: "70vh",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                {getFullName()}
              </Typography>
              <Typography variant="h6">
                HR at {company ? company : 'Amazon'}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
                {getAddress()}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
                {getEmail()}
              </Typography>
              <Typography sx={{ color: "#868686" }}>
                {getDOB()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(StudentHome);
