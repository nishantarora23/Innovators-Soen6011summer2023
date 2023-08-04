import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import { toast } from "react-toastify";
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
        accessorKey: "studentName",
        header: "Student",
        size: 150,
      },
      {
        accessorKey: "employerName",
        header: "Employer",
        size: 150,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "submissionDate",
        header: "Submission Date",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        editSelectOptions: [
          { text: "Accepted", value: "Accepted" },
          { text: "Rejected", value: "Rejected" },
          { text: "Pending", value: "Pending" },
        ],
        editVariant: "select",
      },
    ],
    []
  );

  const handleSaveRecord = async ({ row, exitEditingMode, values }: any) => {
    const userID = row?.original?.candidateID;
    const newData = { ...row?.original, ...values };
    await updateCandidateApplication(newData)
      .then((res) => {
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData: any) =>
          tableData?.map((row: any) =>
            row?.candidateID === userID ? newData : row
          )
        );
        toast.success("Application Updated Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      })
      .finally(() => {
        exitEditingMode();
      });
  };

  const handleDeleteRecord = async (row: any) => {
    const { candidateID } = row;
    const payload = {
      candidateID,
    };
    await deleteCandidateApplication(payload)
      .then((res) => {
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData) =>
          tableData?.filter((row: any) => row?.candidateID !== candidateID)
        );
        toast.success("Application Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  useEffect(() => {
    const fetchCandidateApplications = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchCandidateApplicationList();
        if (data.error) return toast.error(data.error);
        setTableData(data);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
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
