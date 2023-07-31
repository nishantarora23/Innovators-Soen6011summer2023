import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
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
  const [loading, setLoading] = useState(true);
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

  const handleSaveRecord = async ({ exitEditingMode, values }: any) => {
    await updateEmployer(values)
      .then((res) => {
        setTableData((tableData: any) =>
          tableData?.map((row: any) => (row?.id === values.id ? values : row))
        );
        console.log("Student Updated Successfully");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        exitEditingMode();
      });
  };

  const handleDeleteRecord = async (id: string) => {
    await deleteEmployer(id)
      .then((res) => {
        setTableData((tableData) =>
          tableData?.filter((row: any) => row?.id !== id)
        );
        console.log("Student Deleted Successfully");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchEmployers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchEmployersRegistered();
        setTableData(data);
      } catch (error: any) {
        console.log(error.message);
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
