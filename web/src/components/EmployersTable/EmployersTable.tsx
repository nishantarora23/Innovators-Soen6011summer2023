import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";

type TableProps = {
  selectedType: string;
  setSelectedType: any;
};

const EmployersTable = ({ selectedType, setSelectedType }: TableProps) => {
  const [tableData, setTableData] = useState([]);

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

  const handleSaveRecord = ({ exitEditingMode, values }: any) => {
    console.log("📢 [EmployersTable.tsx:406]", values);
    exitEditingMode();
  };

  const handleDeleteRecord = (id: string) => {
    console.log("📢 [EmployersTable.tsx:408]", id);
  };

  useEffect(() => {
    const data: any = [
      {
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        address: "261 Erdman Ford",
        city: "East Daphne",
        state: "Kentucky",
      },
      {
        name: {
          firstName: "Jane",
          lastName: "Doe",
        },
        address: "769 Dominic Grove",
        city: "Columbus",
        state: "Ohio",
      },
      {
        name: {
          firstName: "Joe",
          lastName: "Doe",
        },
        address: "566 Brakus Inlet",
        city: "South Linda",
        state: "West Virginia",
      },
      {
        name: {
          firstName: "Kevin",
          lastName: "Vandy",
        },
        address: "722 Emie Stream",
        city: "Lincoln",
        state: "Nebraska",
      },
      {
        name: {
          firstName: "Joshua",
          lastName: "Rolluffs",
        },
        address: "32188 Larkin Turnpike",
        city: "Omaha",
        state: "Nebraska",
      },
      {
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        address: "261 Erdman Ford",
        city: "East Daphne",
        state: "Kentucky",
      },
      {
        name: {
          firstName: "Jane",
          lastName: "Doe",
        },
        address: "769 Dominic Grove",
        city: "Columbus",
        state: "Ohio",
      },
      {
        name: {
          firstName: "Joe",
          lastName: "Doe",
        },
        address: "566 Brakus Inlet",
        city: "South Linda",
        state: "West Virginia",
      },
      {
        name: {
          firstName: "Kevin",
          lastName: "Vandy",
        },
        address: "722 Emie Stream",
        city: "Lincoln",
        state: "Nebraska",
      },
      {
        name: {
          firstName: "Joshua",
          lastName: "Rolluffs",
        },
        address: "32188 Larkin Turnpike",
        city: "Omaha",
        state: "Nebraska",
      },
    ];
    setTableData(data);
  }, []);

  return (
    <MaterialReactTable
      enableTopToolbar
      columns={columns}
      data={tableData}
      enableStickyHeader
      enableStickyFooter
      muiTableContainerProps={{
        sx: {
          maxHeight: "calc(100vh - 90px - 170px - 180px)",
        },
      }}
      onEditingRowSave={handleSaveRecord}
      enableRowActions
      enableEditing
      positionActionsColumn="last"
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton
              color="error"
              onClick={() => handleDeleteRecord(row.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <Box display="flex" gap="10px" alignItems="center">
          <IconButton size="large" onClick={() => setSelectedType("")}>
            <ArrowBack style={{ color: "#333" }} />
          </IconButton>
          <h1 style={{ color: "#333" }}>{selectedType}</h1>
        </Box>
      )}
    />
  );
};

export default EmployersTable;
