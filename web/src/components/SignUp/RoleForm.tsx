import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Button, Grid, Typography } from "@mui/material";
import { Business, Person } from "@mui/icons-material";
import { User, RoleType } from "../../types";
import "./SignUp.scss";
import "./RoleForm.scss";

type Props = {
  intl: any;
  page: number;
  setPage: React.Dispatch<number>;
  formData: User;
  setFormData: React.Dispatch<User>;
};

const RoleForm = ({ page, setPage, formData, setFormData, intl }: Props) => {
  const [userRole, setUserRole] = useState(
    formData["userRole"] ? formData["userRole"] : RoleType.STUDENT
  );

  useEffect(() => {
    setFormData({
      //reset form data
      ...{
        fullName: "",
        email: "",
        password: "",
        userRole: RoleType.STUDENT,
        dob: new Date().toISOString().split("T")[0],
        cName: "",
        username: "",
        collegeName: "",
      },
      userRole: userRole,
    });
  }, [setFormData, userRole]);

  return (
    <Grid className="form-card">
      <Typography variant="h1">
        {intl.formatMessage({
          id: "roleForm.title",
        })}
      </Typography>
      <Typography variant="h2">
        {intl.formatMessage({
          id: "roleForm.label",
        })}
      </Typography>
      <Grid container justifyContent="space-around">
        <Grid
          item
          xs={3}
          className={`role-card-container ${
            userRole === RoleType.STUDENT ? "selected" : ""
          }`}
        >
          <Button size="large" onClick={() => setUserRole(RoleType.STUDENT)}>
            <Person />
            <Typography>
              {intl.formatMessage({ id: "role.student" })}
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          className={`role-card-container ${
            userRole === RoleType.EMPLOYER ? "selected" : ""
          }`}
        >
          <Button size="large" onClick={() => setUserRole(RoleType.EMPLOYER)}>
            <Business />
            <Typography>
              {intl.formatMessage({ id: "role.employer" })}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container className="button-container">
        <Button
          variant="contained"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {intl.formatMessage({
            id: "userForm.button.next",
          })}
        </Button>
      </Grid>
    </Grid>
  );
};

export default injectIntl(RoleForm);
