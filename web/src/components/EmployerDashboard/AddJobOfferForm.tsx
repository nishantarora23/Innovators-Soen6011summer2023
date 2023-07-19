import { useState } from "react";
import { Auth } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import { Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import { injectIntl } from "react-intl";
import { addJobOfferHelper } from "../../services/userService";
import MenuBar from "../MenuBar/MenuBar";
import { getUserName } from "../../services/userInfoService";

type Props = {
    intl: any;
    formData: Auth;
    setFormData: React.Dispatch<Auth>;
  };

const AddJobOfferForm = ({ formData, setFormData, intl }: Props) => {
    const [loading, setLoading] = useState(false);
    const [isErrorAdding, setErrorAdding] = useState(false);
    const { control, handleSubmit } = useForm({
      reValidateMode: 'onBlur'
    });
    const navigate = useNavigate();
  
    const onSubmit = (data: any) => {
      const addJobOffer = async () => {
        console.log(data);
        data.username = getUserName();
        await setErrorAdding(false);
        await setLoading(true);
        await setFormData({ ...formData, ...data });
        await addJobOfferHelper(JSON.stringify(data))
          .then((response: any) => {
            alert("Job offer added");
            navigate('/employer/home');
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      };
  
      addJobOffer();
    };
  
    const ADD_JOB_OFFERS_FIELDS = [
      {
        id: 'title',
        type: 'text',
        rules: { required: true }
      },
      {
        id: 'description',
        type: 'textarea',
        rules: { required: true }
      },
      {
        id: 'qualifications',
        type: 'text',
        rules: { required: true }
      },
      {
        id: 'responsibilities',
        type: 'text',
        rules: { required: true }
      },
      {
        id: 'location',
        type: 'text'
      },
      {
        id: 'salaryRange',
        type: 'test'
      },
      {
        id: 'contractType',
        type: 'text'
      },
      {
        id: 'deadline',
        type: 'text'
      }
    ];

    const navigateToDashboard = (): void => {
      navigate('/employer/home');
    }
  
    return (
      <>
        <LoadingSpinner isOpen={loading} />
        <Grid container className="add-offer-card">
            <Button  className="backButton" variant="contained" onClick={navigateToDashboard}>
                  {intl.formatMessage({
                    id: 'employerForm.addJobOffer.button.back'
                  })}
            </Button>
          <Grid component="form" container spacing={3} justifyContent="center" alignItems="center">
            {ADD_JOB_OFFERS_FIELDS.map((key, index) => {
              return (
                <Grid key={key.id} item xs={12}>
                  <Controller
                  control={control}
                  name={key.id}
                  rules={key.rules}
                  render={({ field, fieldState: { error } }: any) => {
                    if (key.type === 'textarea') {
                      return (
                        <TextareaAutosize
                          {...field}
                          fullWidth
                          key={field}
                          className="fullWidthTextarea MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-19tru32-MuiInputBase-root-MuiOutlinedInput-root"
                          minRows={12}
                          variant="outlined"
                          aria-label={intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          placeholder={intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          error={error !== undefined}
                          label={intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          helperText={
                            error
                              ? intl.formatMessage({
                                  id: `employerForm.addJobOffer.error.${key.id}.${[error.type]}`
                                })
                              : ''
                          }
                        />
                      );
                    } else {
                      return (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          label={intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          error={error !== undefined}
                          type={key.type}
                          helperText={
                            error
                              ? intl.formatMessage({
                                  id: `employerForm.addJobOffer.error.${key.id}.${[error.type]}`
                                })
                              : ''
                          }
                        />
                      );
                    }
                  }}
                />

                </Grid>
              );
            })}
          </Grid>
          <Grid container className="button-container" spacing={3}>
            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
              {intl.formatMessage({
                id: 'employerForm.addJobOffer.button.add'
              })}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default injectIntl(AddJobOfferForm);
  