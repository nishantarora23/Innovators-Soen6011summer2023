import { injectIntl } from "react-intl";
import {
  Box,
  Button,
  CardContent,
  Modal,
  Typography,
  withTheme,
} from "@mui/material";

import { TouchApp, Work } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { API_URL } from "../../constants";
import { getUserName } from "../../services/userInfoService";

export interface JobInfo {
  title: string;
  description: string;
  username: string;
  location: string;
  qualifications: string;
  deadline: string;
  submissionDate: string;
  jobstatus: string;
  id: string;
}

const MyJobInfo = () => {
  const [open, setOpen] = useState(false);
  const [selectedJobInfo, setSelectedJobInfo] = useState<JobInfo>({
    title: "",
    description: "",
    username: "",
    location: "",
    qualifications: "",
    deadline: "",
    submissionDate: "",
    jobstatus: "",
    id: "",
  });
  const [jobsList, setJobsList] = useState<Array<JobInfo>>([]);

  useEffect(() => {
    fetchJobsList(); // Fetch the jobs list on component mount
  }, []);

  const fetchJobsList = () => {
    axios
      .post(`${API_URL}/my-jobs`, {
        username: getUserName(),
      })
      .then((response) => {
        setJobsList(response?.data ?? []);
      })
      .catch((error) => {
        setJobsList([]);
        console.log(error);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const deleteMyJob = (jobInfo: JobInfo) => {
    axios
      .post(`${API_URL}/application`, {
        username: getUserName(),
        jobId: jobInfo.id,
        ACTION: "REMOVE",
      })
      .then((response) => {
        fetchJobsList();
        setShowDeleteAlert(true);
      })
      .catch((error) => {
        setJobsList([]);
        console.log(error);
      });
  };

  return (
    <>
      <Box component="div" sx={{ marginTop: "20px" }}>
        {jobsList?.length > 0 &&
          jobsList.map((jobInfo) => {
            return (
              <CardContent
                key={jobInfo.username}
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
                  <Box
                    component="span"
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor:
                        jobInfo.jobstatus === "Accepted"
                          ? "green"
                          : jobInfo.jobstatus === "Rejected"
                          ? "#C41E3A"
                          : "#e1ad01",
                      color: "white",
                      fontSize: "1.25rem",
                      padding: "5px 15px",
                      borderRadius: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    {jobInfo.jobstatus}
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "1.25rem",
                  }}
                >
                  {jobInfo.username}
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
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "1.25rem",
                  }}
                >
                  Submitted on {jobInfo.submissionDate}
                </Typography>

                <Box component="div" sx={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "1.1rem", marginRight: "15px" }}
                    onClick={() => {
                      setSelectedJobInfo(jobInfo);
                      handleOpen();
                    }}
                  >
                    <TouchApp sx={{ marginRight: "10px" }} /> View
                  </Button>
                  {jobInfo.jobstatus === "PENDING" && (
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ fontSize: "1.1rem" }}
                      onClick={() => {
                        deleteMyJob(jobInfo);
                      }}
                    >
                      <TouchApp sx={{ marginRight: "10px" }} /> DELETE
                      APPLICATION
                    </Button>
                  )}
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
            {selectedJobInfo?.username} . {selectedJobInfo?.location}
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
              Interview Schduled on: {selectedJobInfo?.deadline}
            </Typography>
          )}
          <Typography
            variant="h5"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            About the job
          </Typography>
          <Typography>{selectedJobInfo?.description}</Typography>
        </Box>
      </Modal>
      <Snackbar
        open={showDeleteAlert}
        autoHideDuration={4000} // Adjust the duration as per your preference
        onClose={handleAlertClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity="success"
        >
          Job Deleted Successfully
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default injectIntl(MyJobInfo);
