import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import "./StatCard.scss";

type Props = {
  title: string;
  value?: number | null;
  icon?: any;
};

const StatCard = ({ title, value, icon: Icon }: Props) => {
  return (
    <Card
      variant="outlined"
      elevation={5}
      sx={{ width: "225px", height: "200px", borderRadius: 2 }}
    >
      <CardContent
        sx={{
          position: "relative",
        }}
      >
        <div className="iconWrapper">
          <Icon className="icon" />
        </div>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h2">{title}</Typography>
          <Typography variant="h1" component="span" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
