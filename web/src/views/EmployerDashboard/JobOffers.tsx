import { Grid } from "@mui/material";
import JobOffers from "../../components/EmployerDashboard/EmployerJobOffers/EmployeeJobOffers";

const EmployerBaseHome = () => {
  return (
    <>
      <Grid container direction="column">
        <JobOffers />
      </Grid>
    </>
  );
};

export default EmployerBaseHome;
