import { Grid } from "@mui/material";
import Applicants from "../../components/EmployerDashboard/Applicants/Applicants";

const ApplicantsComponent = () => {
  return (
    <>
      <Grid container direction="column">
        <Applicants />
      </Grid>
    </>
  );
};

export default ApplicantsComponent;
