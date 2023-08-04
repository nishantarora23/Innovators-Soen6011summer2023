import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";

const Table = (props: any) => {
  const {
    columns,
    tableData,
    handleSaveRecord,
    handleDeleteRecord,
    title,
    showBackBtn,
    backBtnHandler,
  } = props;

  return (
    <MaterialReactTable
      enableTopToolbar
      columns={columns}
      data={tableData}
      enableStickyHeader
      enableStickyFooter
      muiTableContainerProps={{
        sx: {
          maxHeight: "calc(100vh - 190px - 170px - 180px)",
        },
      }}
      muiTablePaperProps={{
        sx: {
          borderRadius: "7px",
          padding: "5px",
        },
      }}
      onEditingRowSave={handleSaveRecord}
      enableRowActions
      enableEditing
      positionActionsColumn="last"
      renderRowActions={({ row, table }: any) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton
              color="error"
              onClick={() => handleDeleteRecord(row.original)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <Box display="flex" gap="10px" paddingX="10px" alignItems="center">
          {showBackBtn ? (
            <IconButton size="large" onClick={backBtnHandler}>
              <ArrowBack style={{ color: "#333" }} />
            </IconButton>
          ) : null}
          <h1 style={{ color: "#333" }}>{title}</h1>
        </Box>
      )}
    />
  );
};

export default Table;
