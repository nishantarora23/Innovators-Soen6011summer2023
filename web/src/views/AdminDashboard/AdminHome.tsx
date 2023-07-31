import React, { useState } from "react";
import { Box } from "@mui/material";
import StatCard from "../../components/StatCard/StatCard";
import { Person, Store } from "@mui/icons-material";

import Students from "./Students";
import Employers from "./Employers";

import "./AdminDashboard.scss";

const AdminHome = () => {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="pageContainer">
      {selectedType ? (
        selectedType === "Students Enrolled" ? (
          <Students
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        ) : (
          <Employers
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        )
      ) : (
        <>
          <h1>Hello, Admin!</h1>
          <Box display="flex" gap="24px">
            <StatCard
              handleClick={() => setSelectedType("Students Enrolled")}
              title="Students Enrolled"
              value={500}
              icon={Person}
            />
            <StatCard
              handleClick={() => setSelectedType("Employers Registered")}
              title="Employers Registered"
              value={500}
              icon={Store}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default AdminHome;
