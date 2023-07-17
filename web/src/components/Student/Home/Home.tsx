import { injectIntl } from "react-intl";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Input,
} from "@mui/material";
import { getFullName } from "../../../services/userInfoService";
import { Link } from "react-router-dom";
import {
  Article,
  Bookmark,
  Notifications,
  AssignmentTurnedIn,
} from "@mui/icons-material";

const StudentHome = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={5} lg={3}>
          <Card
            sx={{
              textAlign: "left",
              margin: "25px",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #c4c4c4",
              height: "calc(100vh - 350px)",
            }}
          >
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
              >
                <Bookmark sx={{ marginRight: "10px" }} /> My Jobs
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
              >
                <Notifications sx={{ marginRight: "10px" }} /> Job alerts
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                sx={{ fontSize: "1.1rem" }}
              >
                <AssignmentTurnedIn sx={{ marginRight: "10px" }} /> Skill
                assessments
              </Button>
            </div>
            <div>
              <Button
                component={Link}
                to={""}
                color="primary"
                onClick={() => {
                  window.open("https://quickcv.vercel.app/", "_blank");
                }}
                sx={{ fontSize: "1.1rem" }}
              >
                <Article sx={{ marginRight: "10px" }} /> Resume Builder
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={9}>
          <Card
            sx={{
              textAlign: "left",
              margin: "25px 25px 25px 0",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #c4c4c4",
              height: "calc(100vh - 350px)",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                {getFullName()}
              </Typography>
              <Typography variant="h6">
                Graduate Student at Concordia University
              </Typography>
              <Typography sx={{ color: "#868686" }}>
                Montreal, Quebec, Canada
              </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">File Upload</Typography>
              <TextField
                label="File"
                // value={file.name}
                // disabled={file === null}
              />
              <Input
                type="file"
                // onChange={handleFileChange}
                inputProps={{ multiple: true }}
              />
              <Button
                variant="contained"
                color="primary"
                // disabled={file === null}
              >
                Upload
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.open("https://quickcv.vercel.app/", "_blank");
              }}
            >
              Resume Builder
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default injectIntl(StudentHome);
