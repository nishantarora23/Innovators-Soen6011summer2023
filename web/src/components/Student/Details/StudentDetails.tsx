import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardMedia,
  Avatar,
  List,
  ListItem,
  ListItemText,
  CardContent,
  Button,
  Snackbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { indigo } from "@mui/material/colors";
import {
  CloudUpload,
  Person4,
  CloudDownload,
  Delete,
} from "@mui/icons-material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import {
  getDOB,
  getEmail,
  getFullName,
  getUserInfo,
  getUserName,
  getUserRole,
} from "../../../services/userInfoService";
import resumeBuilder from "../../../assets/resume_builder.jpg";
import networking from "../../../assets/networking.jpg";
import success from "../../../assets/success.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../constants";

const styles = {
  container: {
    padding: "20px",
    // borderRadius: "10px",
    // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "15px",
    color: "#3f51b5",
    display: "flex",
    alignItems: "center",
  },
  detail: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  icon: {
    marginRight: "8px",
  },
  sectionHeading: {
    marginTop: "20px",
    marginBottom: "10px",
    color: "#3f51b5",
    display: "flex",
    alignItems: "center",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    flex: 1,
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    cursor: "pointer",
  },

  avatar: {
    width: 80,
    height: 80,
    margin: "0 auto 10px",
  },
  media: {
    height: 140,
  },
  itemList: {
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
  },
  cardMedia: {
    height: 180, // Set the height of the media (adjust as needed)
  },
};

export interface ResumeSnackbar {
  open: boolean;
  severity: AlertColor;
  message: string;
}

const StudentDetails = () => {
  // Assuming you have the student details as variables
  const studentName = "John Doe";
  const university = "ABC University";
  const address = "123 Main St, City, Country";
  const dob = "1995-08-25"; // Assuming Date of Birth is in the format YYYY-MM-DD
  const [resumeSnackbar, setResumeSnackbar] = useState<ResumeSnackbar>({
    open: false,
    severity: "info",
    message: "",
  });

  // Formatting Date of Birth
  const formattedDOB = getDOB()?.substring(0, 11);

  // Placeholder data for job recommendations, alumni success stories, and featured workshops and webinars
  const jobRecommendations = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Co.",
      location: "City",
    },
    { id: 2, title: "Data Analyst", company: "Data Corp.", location: "City" },
  ];

  const alumniSuccessStories = [
    {
      id: 1,
      name: "Jane Smith",
      role: "Software Engineer",
      company: "Tech Innovations",
      location: "City",
      testimonial:
        "Through the platform's intuitive portal, I secured an amazing job opportunity, making my transition from student to professional a breeze",
      image: success, // Replace with actual alumni photo
    },
    // Add more alumni success stories here...
  ];

  const featuredWorkshopsAndWebinars = [
    {
      id: 1,
      title: "Resume Building Workshop",
      date: "2023-08-15",
      image: resumeBuilder,
      url: "https://www.youtube.com/watch?v=n0RYvLqeQkU",
    },
    {
      id: 2,
      title: "Networking Strategies Webinar",
      date: "2023-08-20",
      image: networking,
      url: "https://youtu.be/E5xTbn6OnAA.",
    },
    // Add more featured workshops and webinars here...
  ];

  const companySpotlights = [
    {
      id: 1,
      name: "Microsoft Corporation",
      description:
        "Empowering individuals and organizations worldwide with cutting-edge software and hardware solutions",
    },
    {
      id: 2,
      name: "Amazon",
      description:
        "The world's largest online marketplace, offering endless selection and unbeatable convenience",
    },
    {
      id: 3,
      name: "Facebook (Meta Platforms Inc.)",
      description:
        "Connecting people and building communities through social networking.",
    },
  ];

  const handleResumeUpload = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (event: any) => {
    console.log(event);
    if (event?.target?.files?.length) {
      const formData = new FormData();
      formData.append("username", getUserName() ?? "");
      formData.append("fullName", getFullName() ?? "");
      formData.append("email", getEmail() ?? "");
      formData.append("userRole", getUserRole() ?? "");
      formData.append("resume", event.target.files[0]);
      axios
        .post(`${API_URL}/upload-resume/${getUserName()}`, formData)
        .then(() => {
          setResumeSnackbar({
            open: true,
            severity: "success",
            message: "Resume uploaded sucessfully.",
          });
        })
        .catch((error) => {
          setResumeSnackbar({
            open: true,
            severity: "error",
            message: "Resume upload failed.",
          });
          console.log(error);
        });
    }
  };

  const handleResumeDownload = () => {
    const payload = {
      username: getUserName(),
    };
    axios
      .post(`${API_URL}/viewResume`, payload, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data])); // Create a Blob from the response data
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.pdf"; // Set the desired filename for the downloaded file
        document.body.appendChild(a);
        a.click();
        a.remove(); // Clean up the temporary element
        window.URL.revokeObjectURL(url);
        setResumeSnackbar({
          open: true,
          severity: "success",
          message: "Resume downloaded successfully.",
        });
      })
      .catch(() => {
        setResumeSnackbar({
          open: true,
          severity: "error",
          message: "Resume download failed. You may not have any resume",
        });
      });
  };

  const handleResumeDelete = () => {
    const payload = {
      username: getUserName(),
    };
    axios
      .post(`${API_URL}/deleteResume`, payload)
      .then(() => {
        setResumeSnackbar({
          open: true,
          severity: "success",
          message: "Resume delete sucessfully.",
        });
      })
      .catch(() => {
        setResumeSnackbar({
          open: true,
          severity: "error",
          message: "Resume delete failed.",
        });
      });
  };

  return (
    <Box component="div" sx={styles.container}>
      <Snackbar
        open={resumeSnackbar.open}
        autoHideDuration={3000}
        onClose={() => {
          setResumeSnackbar({
            open: false,
            severity: "info",
            message: "",
          });
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          marginTop: "5rem",
        }}
      >
        <MuiAlert severity={resumeSnackbar.severity}>
          {resumeSnackbar.message}
        </MuiAlert>
      </Snackbar>
      <Typography variant="h4" sx={styles.heading}>
        <EventNoteIcon sx={styles.icon} />
        Student Details
      </Typography>

      {/* Student Information Card */}
      <CardContent>
        <Avatar
          sx={{
            bgcolor: indigo[100],
            width: "100px",
            height: "100px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          <Person4 color="primary" sx={{ fontSize: "5rem" }} />
        </Avatar>
        <Box component="div" sx={{ marginTop: "20px", marginLeft: "20px" }}>
          <Typography
            variant="h4"
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            {getFullName()}
          </Typography>
          <Typography variant="h6">
            {getUserInfo("userRole") +
              " at " +
              (getUserInfo("collegeName") ?? getUserInfo("cName"))}
          </Typography>
          <Box sx={styles.detail}>
            <EventNoteIcon sx={styles.icon} />
            <Typography variant="body2">
              Date of Birth: {formattedDOB}
            </Typography>
          </Box>
          <Box sx={styles.detail}>
            <LocationOnIcon sx={styles.icon} />
            <Typography variant="body2">{getUserInfo("address")}</Typography>
          </Box>
        </Box>
      </CardContent>
      {/* <Card sx={styles.card}>
        <Avatar
          src="https://via.placeholder.com/80" // Replace with actual student photo
          alt="Student Photo"
          sx={styles.avatar}
        />
        <Typography variant="h6">{studentName}</Typography>
        <Typography variant="body1">{university}</Typography>
        <Box sx={styles.detail}>
          <EventNoteIcon sx={styles.icon} />
          <Typography variant="body2">Date of Birth: {formattedDOB}</Typography>
        </Box>
        <Box sx={styles.detail}>
          <LocationOnIcon sx={styles.icon} />
          <Typography variant="body2">{address}</Typography>
        </Box>
      </Card> */}
      <Box component="div" sx={{ float: "right", marginTop: "-10rem" }}>
        <Typography variant="body1">
          <Typography
            sx={{ marginLeft: "12px", fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Resume
          </Typography>
          <Tooltip title="Upload resume">
            <IconButton
              size="large"
              aria-label="upload resume"
              sx={{ color: "#9c27b0" }}
            >
              <CloudUpload
                sx={{ fontSize: "2rem" }}
                onClick={handleResumeUpload}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download resume">
            <IconButton
              color="primary"
              size="large"
              aria-label="download resume"
            >
              <CloudDownload
                sx={{ fontSize: "2rem" }}
                onClick={handleResumeDownload}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete resume">
            <IconButton color="error" size="large" aria-label="delete resume">
              <Delete sx={{ fontSize: "2rem" }} onClick={handleResumeDelete} />
            </IconButton>
          </Tooltip>
        </Typography>
        <input
          id="fileInput"
          className="custom-file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          hidden
        />
      </Box>
      {/* Career Resources */}
      <Typography variant="h5" sx={styles.sectionHeading}>
        <EventNoteIcon sx={styles.icon} />
        Career Resources
      </Typography>
      <Typography variant="body1">
        Check out our interview tips and resume-building guides to boost your
        job search.
      </Typography>

      {/* Company Spotlights */}
      <Typography variant="h5" sx={styles.sectionHeading}>
        <EventNoteIcon sx={styles.icon} />
        Company Spotlights
      </Typography>
      <Box sx={styles.cardContainer}>
        {companySpotlights.map((company) => (
          <Card key={company.id} sx={styles.card}>
            <Typography variant="subtitle1">{company.name}</Typography>
            <Typography variant="body2">{company.description}</Typography>
          </Card>
        ))}
      </Box>
      {/* Featured Workshops and Webinars */}
      <Typography variant="h5" sx={styles.sectionHeading}>
        <EventNoteIcon sx={styles.icon} />
        Featured Workshops and Webinars
      </Typography>
      <List sx={styles.itemList}>
        {featuredWorkshopsAndWebinars.map((event) => (
          <ListItem
            key={event.id}
            sx={{ flexBasis: "350px", marginBottom: "10px" }}
          >
            <Card
              sx={styles.card}
              onClick={() => {
                window.open(event.url, "_blank");
              }}
            >
              <CardMedia
                component="img"
                image={event.image}
                alt={event.title}
                sx={styles.media}
              />
              <ListItemText
                primary={event.title}
                secondary={`Date: ${new Date(event.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}`}
              />
            </Card>
          </ListItem>
        ))}
      </List>

      {/* Alumni Success Stories */}
      <Typography variant="h5" sx={styles.sectionHeading}>
        <EventNoteIcon sx={styles.icon} />
        Alumni Success Stories
      </Typography>
      <Box sx={styles.cardContainer}>
        {alumniSuccessStories.map((alumni) => (
          <Card key={alumni.id} sx={styles.card}>
            <CardMedia
              component="img"
              image={alumni.image}
              alt={alumni.name}
              sx={styles.media}
            />
            <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
              {alumni.name}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "5px" }}>
              {alumni.role} at {alumni.company}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "5px" }}>
              {alumni.testimonial}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Career Resources */}
      {/* (Keep the existing career resources section) */}

      {/* Company Spotlights */}
      {/* (Keep the existing company spotlights section) */}
    </Box>
  );
};

export default StudentDetails;
