import { useEffect, useState } from "react";
import { Auth } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import { Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import { injectIntl } from "react-intl";
import { addJobOfferHelper, updateJobOfferHelper } from "../../services/userService";
import MenuBar from "../MenuBar/MenuBar";
import { getFullName, getUserName } from "../../services/userInfoService";

import { getJobOfferById } from "../../services/userService";

type Props = {
    intl: any;
    formData: Auth;
    setFormData: React.Dispatch<Auth>;
    jobId?: string;
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

  const AddJobOfferForm = ({ formData, setFormData, intl}: Props) => {
    const [loading, setLoading] = useState(false);
    const [jobOffer, setJobOffer] = useState<JobOffer>();
    const {jobId} = useParams();
    const [isErrorAdding, setErrorAdding] = useState(false);
    const { control, handleSubmit, setValue } = useForm({
      reValidateMode: 'onBlur'
    });
    const navigate = useNavigate();

    const handleFieldChange = (fieldId: string, value: string) => {
      if(jobOffer){
        setJobOffer((prevJobOffer) => ({
          ...prevJobOffer,
          [fieldId]: value,
        }));
      }else{
        setValue(fieldId, value);
      }
    };

    useEffect(() => {
      // If the component is in "edit" mode, fetch the job offer data and pre-populate the form fields
      const fetchJobOfferData = async () => {
        if (jobId) {
          try {
            setLoading(true);
            const jobOfferData: any = await getJobOfferById(jobId); // Fetch job offer data by id
            // Pre-populate the form fields with the existing job offer data
            Object.entries(jobOfferData).forEach(([key, value]) => {
              setValue(key, value);
            });
            setJobOffer(jobOfferData.data);
          } catch (error) {
            console.error("Error fetching job offer data:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchJobOfferData();
    }, [jobId, setValue]);
  
    const onSubmit = (data: any) => {
      const addOrUpdateJobOffer = async () => {
        data.username = getUserName();
        data.name = getFullName();
        await setErrorAdding(false);
        await setLoading(true);
        await setFormData({ ...formData, ...data });

        try {
          if (jobId) {
            await updateJobOfferHelper(jobOffer)
            .then((res) => navigate('/employer/jobOffers'))
            .catch(err => console.log(err));
          } else {
            await addJobOfferHelper(data)
            .then((res) => navigate('/employer/home'))
            .catch(err => console.log(err));
          }
        } catch (err) {
          console.error("Error adding/updating job offer:", err);
        } finally {
          setLoading(false);
        }
    }
    addOrUpdateJobOffer();
  }
  
    const ADD_JOB_OFFERS_FIELDS = [
      {
        id: 'title',
        type: 'text',
        rules: { required: !jobOffer && true }
      },
      {
        id: 'description',
        type: 'textarea',
        rules: { required: !jobOffer && true }
      },
      {
        id: 'qualifications',
        type: 'text',
        rules: { required: !jobOffer && true }
      },
      {
        id: 'responsibilities',
        type: 'text',
        rules: { required: !jobOffer && true }
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

    const navigateBackwards = (): void => {
      if(jobOffer)
        navigate('/employer/jobOffers');
      else
        navigate('/employer/home');
    }
  
    return (
      <>
        <LoadingSpinner isOpen={loading} />
        <Grid container className="add-offer-card">
            <Button  className="backButton" variant="contained" onClick={navigateBackwards} sx = {{marginBottom : "10px"}}>
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
                          value={jobOffer && jobOffer[key.id as keyof JobOffer]} // Access the value from the jobOffer object using key.id as the key
                          variant="outlined"
                          aria-label={!jobOffer && intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          placeholder={!jobOffer && intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          error={error !== undefined}
                          label={intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          helperText={
                            error
                              ? intl.formatMessage({
                                  id: `employerForm.addJobOffer.error.${key.id}.${[error.type]}`
                                })
                              : ''
                          }
                          onChange={(e) => handleFieldChange(key.id, e.target.value)}
                        />
                      );
                    } else {
                      return (
                        <TextField
                          {...field}
                          fullWidth
                          value={jobOffer && jobOffer[key.id as keyof JobOffer]} // Access the value from the jobOffer object using key.id as the key
                          variant="outlined"
                          label={ !jobOffer && intl.formatMessage({ id: `employerForm.addJobOffer.label.${key.id}` })}
                          error={error !== undefined}
                          type={key.type}
                          helperText={
                            error
                              ? intl.formatMessage({
                                  id: `employerForm.addJobOffer.error.${key.id}.${[error.type]}`
                                })
                              : ''
                          }
                          onChange={(e) => handleFieldChange(key.id, e.target.value)}
                        />
                      );
                    }
                  }}
                />

                </Grid>
              );
            })}
          </Grid>
          <Grid container className="button-container" spacing={3} sx = {{float: "right"}}>
            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} sx = {{marginTop : "30px"}}>
              {intl.formatMessage({
                id: jobOffer? 'employerForm.addJobOffer.button.update' : 'employerForm.addJobOffer.button.add'
              })}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default injectIntl(AddJobOfferForm);
  