import React, { useEffect, useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";
import { deleteStudent, fetchStudentEnrolled, updateStudent } from "./api";

type TableProps = {
  selectedType: string;
  setSelectedType: any;
};

const Students = ({ selectedType, setSelectedType }: TableProps) => {
  const [tableData, setTableData] = useState<any>([]);
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
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData: any) =>
          tableData?.map((row: any) =>
            row?.username === userID ? newData : row
          )
        );
        toast.success("Student Updated Successfully");
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
    await deleteStudent(payload)
      .then((res) => {
        if (res && res.error) {
          return toast.error(res.error);
        }
        setTableData((tableData: any) =>
          tableData?.filter((row: any) => row?.username !== username)
        );
        toast.success("Student Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchStudentEnrolled();
        // if (data.error) return toast.error(data.error);
        setTableData([
          {
            name: "John Doe",
            college_name: "University of XYZ",
            email: "john.doe@example.com",
            dob: "1995-07-15",
            address: "123 Main Street, City, Country",
            username: "john_doe_123",
          },
          {
            name: "Jane Smith",
            college_name: "ABC College",
            email: "jane.smith@example.com",
            dob: "1998-03-20",
            address: "456 Park Avenue, Town, Country",
            username: "jane_smith_456",
          },
          {
            name: "Michael Johnson",
            college_name: "University of ABC",
            email: "michael.johnson@example.com",
            dob: "1990-11-02",
            address: "789 Oak Road, Village, Country",
            username: "michael_johnson_789",
          },
          {
            name: "Emily Williams",
            college_name: "XYZ College",
            email: "emily.williams@example.com",
            dob: "1992-09-10",
            address: "101 Elm Lane, City, Country",
            username: "emily_williams_101",
          },
          {
            name: "William Brown",
            college_name: "ABC University",
            email: "william.brown@example.com",
            dob: "1997-05-25",
            address: "222 Maple Street, Town, Country",
            username: "william_brown_222",
          },
          {
            name: "Olivia Davis",
            college_name: "University of XYZ",
            email: "olivia.davis@example.com",
            dob: "1994-12-18",
            address: "333 Pine Avenue, Village, Country",
            username: "olivia_davis_333",
          },
          {
            name: "James Wilson",
            college_name: "ABC College",
            email: "james.wilson@example.com",
            dob: "1989-06-30",
            address: "444 Cedar Road, City, Country",
            username: "james_wilson_444",
          },
          {
            name: "Sophia Taylor",
            college_name: "XYZ University",
            email: "sophia.taylor@example.com",
            dob: "1993-04-12",
            address: "555 Oak Lane, Town, Country",
            username: "sophia_taylor_555",
          },
          {
            name: "Liam Martinez",
            college_name: "University of ABC",
            email: "liam.martinez@example.com",
            dob: "1996-08-28",
            address: "666 Maple Street, Village, Country",
            username: "liam_martinez_666",
          },
          {
            name: "Ava Anderson",
            college_name: "XYZ College",
            email: "ava.anderson@example.com",
            dob: "1991-02-05",
            address: "777 Elm Avenue, City, Country",
            username: "ava_anderson_777",
          },
        ]);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
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
