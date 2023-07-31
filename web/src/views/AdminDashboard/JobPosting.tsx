import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import Table from "../../components/Table/Table";

import "./AdminDashboard.scss";
import { deleteJobPost, fetchJobPostList, updateJobPost } from "./api";

const JobPosting = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);

  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      {
        accessorKey: "salaryRange",
        header: "Salary Range",
        size: 150,
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 150,
      },
      {
        accessorKey: "contractType",
        header: "Contract Type",
        size: 150,
        editSelectOptions: [
          { text: "Permanent", value: "permanent" },
          { text: "Temporary", value: "temporary" },
        ],
        editVariant: "select",
      },
      {
        accessorKey: "responsibilities",
        header: "Responsibilities",
        muiTableBodyCellEditTextFieldProps: () => ({
          multiline: true,
          maxRows: 5,
        }),
        size: 150,
      },
      {
        accessorKey: "qualifications",
        header: "Qualifications",
        size: 150,
      },
      {
        accessorKey: "deadline",
        header: "Deadline",
        size: 150,
      },
      {
        accessorKey: "username",
        header: "Username",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        editSelectOptions: [
          { text: "Active", value: "active" },
          { text: "Inactive", value: "inactive" },
        ],
        editVariant: "select",
      },
    ],
    []
  );

  const handleSaveRecord = async ({ exitEditingMode, values }: any) => {
    await updateJobPost(values)
      .then((res) => {
        setTableData((tableData: any) =>
          tableData?.map((row: any) => (row?.id === values.id ? values : row))
        );
        console.log("Job Post Updated Successfully");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        exitEditingMode();
      });
  };

  const handleDeleteRecord = async (id: string) => {
    await deleteJobPost(id)
      .then((res) => {
        setTableData((tableData) =>
          tableData?.filter((row: any) => row?.id !== id)
        );
        console.log("Job Post Deleted Successfully");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchJobPosts = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchJobPostList();
        setTableData(data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setFetchedData(true);
        setLoading(false);
      }
    };

    if (!tableData.length && !fetchedData) fetchJobPosts();
  }, [tableData, loading, fetchedData]);

  return (
    <div className="pageContainer">
      <Table
        columns={columns}
        tableData={[
          {
            title: "Developer",
            salaryRange: "100k-150k",
            responsibilities: "responsibilitises",
            qualifications: "qualifications",
            location: "Montreal",
            description: "test job offer",
            deadline: "August 10",
            contractType: "permanent",
            username: "nav",
            status: "active",
            id: 1,
          },
        ]}
        handleSaveRecord={handleSaveRecord}
        handleDeleteRecord={handleDeleteRecord}
        title={"Job Posting"}
        showBackBtn={false}
      />
    </div>
  );
};

export default JobPosting;
