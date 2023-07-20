import { Grid } from "@mui/material";
import EmployerHome from "../../components/EmployerDashboard/EmployerHome/EmployerHome";

const EmployerBaseHome = () => {
  return (
    <>
      <Grid container direction="column">
        <EmployerHome />
      </Grid>
    </>
  );
};

export default EmployerBaseHome;
