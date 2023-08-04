import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import Table from "../../components/Table/Table";
import { deleteStudent, fetchStudentEnrolled, updateStudent } from "./api";

type TableProps = {
  selectedType: string;
  setSelectedType: any;
};

const Students = ({ selectedType, setSelectedType }: TableProps) => {
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
        accessorKey: "college_name",
        header: "College Name",
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
    await updateStudent(newData)
      .then((res) => {
        setTableData((tableData: any) =>
          tableData?.map((row: any) =>
            row?.username === userID ? newData : row
          )
        );
        console.log("Student Updated Successfully");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        exitEditingMode();
      });
  };

  const handleDeleteRecord = async (row: any) => {
    const { username } = row;
    const payload = {
      username,
    };
    await deleteStudent(payload)
      .then((res) => {
        setTableData((tableData) =>
          tableData?.filter((row: any) => row?.username !== username)
        );
        console.log("Student Deleted Successfully");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchStudents = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchStudentEnrolled();
        setTableData(data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setFetchedData(true);
        setLoading(false);
      }
    };

    if (!tableData.length && !fetchedData) fetchStudents();
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

export default Students;
