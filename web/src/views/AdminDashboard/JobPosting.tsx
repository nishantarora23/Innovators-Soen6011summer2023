import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";

import "./AdminDashboard.scss";
import { deleteJobPost, fetchJobPostList, updateJobPost } from "./api";

const JobPosting = () => {
  const [tableData, setTableData] = useState<any>([]);
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
        accessorKey: "name",
        header: "Name",
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

  const handleSaveRecord = async ({ row, exitEditingMode, values }: any) => {
    const userID = row?.original?.id;
    const newData = { ...row?.original, ...values };
    await updateJobPost(newData)
      .then((res) => {
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData: any) =>
          tableData?.map((row: any) => (row?.id === userID ? newData : row))
        );
        toast.success("Student Updated Successfully");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        exitEditingMode();
      });
  };

  const handleDeleteRecord = async (row: any) => {
    const id = row?.id;
    const payload = {
      id,
    };
    await deleteJobPost(payload)
      .then((res) => {
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData: any) =>
          tableData?.filter((row: any) => row?.id !== id)
        );
        toast.success("Job Post Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const fetchJobPosts = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchJobPostList();
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

    if (!tableData.length && !fetchedData) fetchJobPosts();
  }, [tableData, loading, fetchedData]);

  return (
    <div className="pageContainer">
      <Table
        columns={columns}
        tableData={tableData}
        handleSaveRecord={handleSaveRecord}
        handleDeleteRecord={handleDeleteRecord}
        title={"Job Posting"}
        showBackBtn={false}
      />
    </div>
  );
};

export default JobPosting;
