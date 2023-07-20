import React from "react";
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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { indigo } from "@mui/material/colors";
import { Person4 } from "@mui/icons-material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { getFullName, getUserInfo } from "../../../services/userInfoService";
import resumeBuilder from '../../../assets/resume_builder.jpg';
import networking from "../../../assets/networking.jpg"

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
    padding: "20px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    cursor: "pointer"
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

const StudentDetails = () => {
  // Assuming you have the student details as variables
  const studentName = "John Doe";
  const university = "ABC University";
  const address = "123 Main St, City, Country";
  const dob = "1995-08-25"; // Assuming Date of Birth is in the format YYYY-MM-DD

  // Formatting Date of Birth
  const formattedDOB = new Date(dob).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image: "https://via.placeholder.com/300x180", // Replace with actual alumni photo
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

  return (
    <Box component="div" sx={styles.container}>
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
              (getUserInfo("cName") ?? getUserInfo("collegeName"))}
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
            <Typography variant="subtitle1">{alumni.name}</Typography>
            <Typography variant="body2">
              {alumni.role} at {alumni.company}
            </Typography>
            <Typography variant="body2">{alumni.testimonial}</Typography>
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
