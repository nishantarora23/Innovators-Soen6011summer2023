import { injectIntl } from "react-intl";
import { Box, Button, CardContent, Modal, Typography } from "@mui/material";

import { TouchApp, Work } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import axios from "axios";
import { API_URL } from "../../constants";
import { getFullName, getUserName } from "../../services/userInfoService";

export interface EasyApplyResponseSnackbar {
  open: boolean;
  severity: AlertColor;
  message: string;
}

export interface JobInfo {
  title: string;
  description: string;
  name: string;
  location: string;
  qualifications: string;
  deadline: string;
  id: string;
}

const JobsList = () => {
  const [open, setOpen] = useState(false);
  const [selectedJobInfo, setSelectedJobInfo] = useState<JobInfo>({
    title: "",
    description: "",
    name: "",
    location: "",
    qualifications: "",
    deadline: "",
    id : ""
  });
  const [jobsList, setJobsList] = useState<Array<JobInfo>>([]);
  const [easyApplyResponseSnackbar, setEasyApplyResponseSnackbar] =
    useState<EasyApplyResponseSnackbar>({
      open: false,
      severity: "info",
      message: "",
    });

  useEffect(() => {
    axios
      .get(`${API_URL}/jobOffer`)
      .then((response) => {
        setJobsList(response?.data ?? []);
      })
      .catch((error) => {
        setJobsList([]);
        console.log(error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEasyApply = (payload: JobInfo) => {
    const objectPayload = {
      jobid : payload.id,
      username : getUserName(),
      applicant : getFullName(),
      ACTION : 'ADD'
    }
    axios.post(`${API_URL}/application`, objectPayload).then(() => {
      setEasyApplyResponseSnackbar({
        open: true,
        severity: "success",
        message: "Applied for job sucessfully."
      });
    }).catch(() => {
      setEasyApplyResponseSnackbar({
        open: true,
        severity: "error",
        message: "Upload your resume to apply for jobs!"
      });
    });
  };

  return (
    <>
      <Snackbar open={easyApplyResponseSnackbar.open} autoHideDuration={3000}>
        <MuiAlert severity={easyApplyResponseSnackbar.severity}>
          {easyApplyResponseSnackbar.message}
        </MuiAlert>
      </Snackbar>
      <Box component="div" sx={{ marginTop: "20px" }}>
        {jobsList?.length > 0 &&
          jobsList.map((jobInfo) => {
            return (
              <CardContent
                key={jobInfo.name}
                sx={{
                  borderBottom: "1px solid #868686",
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {jobInfo.title}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "1.25rem",
                  }}
                >
                  {jobInfo.name}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "1.25rem",
                    color: "#868686",
                  }}
                >
                  {jobInfo.location}
                </Typography>
                <Box component="div" sx={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "1.1rem" }}
                    onClick={() => {
                      setSelectedJobInfo(jobInfo);
                      handleOpen();
                    }}
                  >
                    <TouchApp sx={{ marginRight: "10px" }} /> Apply
                  </Button>
                </Box>
              </CardContent>
            );
          })}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
            textAlign: "left",
          }}
        >
          <Typography
            id="modal-title"
            sx={{
              fontSize: "1.75rem",
              fontWeight: "600",
            }}
          >
            {selectedJobInfo?.title}
          </Typography>
          <p id="modal-description">
            {selectedJobInfo?.name} . {selectedJobInfo?.location}
          </p>
          <Typography>
            <Work sx={{ marginTop: "10px", marginRight: "10px" }} />
            {selectedJobInfo?.qualifications}
          </Typography>
          {selectedJobInfo?.deadline && (
            <Typography
              sx={{
                fontSize: "1.1rem",
                marginTop: "10px",
              }}
            >
              Apply before: {selectedJobInfo?.deadline}
            </Typography>
          )}
          <Typography
            variant="h5"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            About the job
          </Typography>
          <Typography>{selectedJobInfo?.description}</Typography>
          <Box component="div" sx={{ float: "right" }}>
            <Button
              variant="contained"
              onClick={() => {handleEasyApply(selectedJobInfo)}}
              sx={{ marginRight: "20px" }}
            >
              Easy Apply
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default injectIntl(JobsList);
