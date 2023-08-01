import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StatCard from "../../components/StatCard/StatCard";
import { Person, Store } from "@mui/icons-material";

import Students from "./Students";
import Employers from "./Employers";

import "./AdminDashboard.scss";
import { fetchEmployersRegistered, fetchStudentEnrolled } from "./api";

const AdminHome = () => {
  const [selectedType, setSelectedType] = useState("");
  const [studentsCount, setStudentsCount] = useState(0);
  const [employersCount, setEmployersCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      const data = await fetchStudentEnrolled();
      setStudentsCount(data?.length || 0);
    };

    const fetchEmployersCount = async () => {
      const data = await fetchEmployersRegistered();
      setEmployersCount(data?.length || 0);
    };

    fetchStudentCount();
    fetchEmployersCount();
  }, []);

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
              value={studentsCount}
              icon={Person}
            />
            <StatCard
              handleClick={() => setSelectedType("Employers Registered")}
              title="Employers Registered"
              value={employersCount}
              icon={Store}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default AdminHome;
