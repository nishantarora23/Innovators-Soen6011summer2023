import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";
import {
  deleteEmployer,
  fetchEmployersRegistered,
  updateEmployer,
} from "./api";

type TableProps = {
  selectedType: string;
  setSelectedType: any;
};

const Employers = ({ selectedType, setSelectedType }: TableProps) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);

  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "company_name",
        header: "Company Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
    ],
    []
  );

  const handleSaveRecord = async ({ row, exitEditingMode, values }: any) => {
    const userID = row?.original?.username;
    const newData = { ...row?.original, ...values };
    await updateEmployer(newData)
      .then((res) => {
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData: any) =>
          tableData?.map((row: any) =>
            row?.username === userID ? newData : row
          )
        );
        toast.success("Emplpoyer Updated Successfully");
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
    const { username } = row;
    const payload = {
      username,
    };
    await deleteEmployer(payload)
      .then((res) => {
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData) =>
          tableData?.filter((row: any) => row?.username !== username)
        );
        toast.success("Employer Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const fetchEmployers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchEmployersRegistered();
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

    if (!tableData.length && !fetchedData) fetchEmployers();
  }, [tableData, loading, fetchedData]);

  return (
    <Table
      columns={columns}
      tableData={tableData}
      handleSaveRecord={handleSaveRecord}
      handleDeleteRecord={handleDeleteRecord}
      title={selectedType}
      showBackBtn
      backBtnHandler={() => setSelectedType("")}
    />
  );
};

export default Employers;
