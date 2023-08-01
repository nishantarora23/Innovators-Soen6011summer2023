import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import Table from "../../components/Table/Table";

import "./AdminDashboard.scss";
import {
  deleteCandidateApplication,
  fetchCandidateApplicationList,
  updateCandidateApplication,
} from "./api";

const CandidateApplications = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);

  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      // address
//: 
// "123 Driver Lane"
// company_name
// : 
// "Amazon"
// dob
// : 
// "1975-10-22"
// email
// : 
// "gustavo.fring@gmail.com"
// id
// : 
// "2"
// name
// : 
// "Gustavo Fring"
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        size: 150,
      },
      {
        accessorKey: "company_name",
        header: "Comapny Name",
        size: 150,
        
      },
    ],
    []
  );

  const handleSaveRecord = async ({ exitEditingMode, values }: any) => {
    await updateCandidateApplication(values)
      .then((res) => {
        setTableData((tableData: any) =>
          tableData?.map((row: any) => (row?.id === values.id ? values : row))
        );
        console.log("Application Updated Successfully");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        exitEditingMode();
      });
  };

  const handleDeleteRecord = async (id: string) => {
    await deleteCandidateApplication(id)
      .then((res) => {
        setTableData((tableData) =>
          tableData?.filter((row: any) => row?.id !== id)
        );
        console.log("Application Deleted Successfully");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const fetchCandidateApplications = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchCandidateApplicationList();
        setTableData(data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setFetchedData(true);
        setLoading(false);
      }
    };

    if (!tableData.length && !fetchedData) fetchCandidateApplications();
  }, [tableData, loading, fetchedData]);

  return (
    <div className="pageContainer">
      <Table
        columns={columns}
        tableData={tableData}
        handleSaveRecord={handleSaveRecord}
        handleDeleteRecord={handleDeleteRecord}
        title={"Candidate Applications"}
        showBackBtn={false}
      />
    </div>
  );
};

export default CandidateApplications;
