import { injectIntl } from "react-intl";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { User } from "../../types";
import "./DisclaimerForm.scss";
import "./SignUp.scss";

type Props = {
  intl: any;
  page: number;
  setPage: React.Dispatch<number>;
  formData: User;
  setFormData: React.Dispatch<User>;
};

const DisclaimerForm = ({
  page,
  setPage,
  formData,
  setFormData,
  intl,
}: Props) => {
  const { control, handleSubmit, watch } = useForm({
    reValidateMode: "onBlur",
  });
  const disclaimerTypes = ["website", "professional"];

  const onSubmit = () => {
    setFormData({ ...formData });
    setPage(page + 1);
  };

  const agreed = watch("disclaimer"); // Get the value of the checkbox

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h1" className="form-title">
          {intl.formatMessage({
            id: "disclaimerForm.title",
          })}
        </Typography>
        <Typography variant="h2" className="form-subtitle">
          {intl.formatMessage({
            id: "disclaimerForm.label",
          })}
        </Typography>
        <Grid container className="disclaimer-container">
          {disclaimerTypes.map((type) => (
            <Grid item key={type} className="disclaimer-type-container">
              <Typography variant="h3" className="disclaimer-type-title">
                {intl.formatMessage({ id: `disclaimerForm.${type}.title` })}
              </Typography>
              <Typography className="disclaimer-type-description">
                {intl.formatMessage({
                  id: `disclaimerForm.${type}.description`,
                })}
              </Typography>
            </Grid>
          ))}
          <Controller
            name="disclaimer"
            control={control}
            rules={{ required: true }}
            render={({ field: props, fieldState: { error } }: any) => (
              <Grid item className="disclaimer-checkbox-container">
                <Checkbox
                  {...props}
                  checked={props.value}
                  onChange={(e) => props.onChange(e.target.checked)}
                />
                <Typography
                  className={`disclaimer-agree-text ${
                    error ? "error-text" : ""
                  }`}
                >
                  {intl.formatMessage({ id: "disclaimerForm.agree.label" })}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
      </CardContent>
      <div className="button-container">
        <Button
          variant="contained"
          className="back-button"
          onClick={() => setPage(page - 1)}
          style={{
            backgroundColor: "#3498db", // Customize background color
            color: "#fff", // Text color
            fontWeight: "bold", // Bold text
            borderRadius: "8px", // Rounded corners
            padding: "10px 20px", // Padding
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Box shadow
            transition: "background-color 0.3s, transform 0.2s", // Transition effects
          }}
        >
          &#8592; {intl.formatMessage({ id: "userForm.button.back" })}
        </Button>
        <Button
          variant="contained"
          className={`submit-button ${agreed ? "" : "disabled"}`} // Apply additional styles when disabled
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!agreed} // Disable button if checkbox not ticked
        >
          {intl.formatMessage({
            id: "userForm.button.submit",
          })}
        </Button>
      </div>
    </Card>
  );
};

export default injectIntl(DisclaimerForm);
