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
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
        editSelectOptions: [
          { text: "test", value: "test" },
          { text: "test1", value: "test1" },
          { text: "test2", value: "test2" },
        ],
        editVariant: "select",
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
