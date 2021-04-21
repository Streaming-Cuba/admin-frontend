import React, { useMemo, useState, useEffect } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import { Tooltip, IconButton, Box } from "@material-ui/core";

import PageTitle from "../../../components/PageTitle";
import {
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  OpenInNew as OpenInNewIcon,
  Description as DescriptionIcon,
} from "@material-ui/icons";
import GridLoadingOverlay from "../../../components/Grid/LoadingOverlay";
import GridNoRowsOverlay from "../../../components/Grid/NoRowsOverlay";
import { useServerManager } from "../../../components/ServerManagerProvider";
import Role from "../../../types/Role";

function Roles() {
  const serverManager = useServerManager();

  const [isLoading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const refresh = () => {
    setLoading(true);
    serverManager
      .loadRoles(currentPage, pageSize)
      .then((response) => {
        setRoles(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refresh();
  }, []);

  const columns = useMemo<GridColDef[]>(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.3 },
      {
        field: "name",
        headerName: "Nombre",
        flex: 1,
        renderCell: (params: GridCellParams) => {
          const row = roles[params.rowIndex];
          return (
            <Tooltip title={row.description}>
              <div>{row.name}</div>
            </Tooltip>
          );
        },
      },
      {
        field: "",
        headerName: "Acciones",
        align: "right",
        disableColumnMenu: true,
        flex: 0.3,
        renderCell: (params: GridCellParams) => {
          return (
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          );
        },
      },
    ];
  }, [roles]);

  return (
    <div>
      <PageTitle title="Roles de usuario">
        <IconButton onClick={refresh}>
          <RefreshIcon />
        </IconButton>
      </PageTitle>

      <Box width="100%" height="70vh">
        <DataGrid
          rows={roles}
          columns={columns}
          checkboxSelection
          components={{
            LoadingOverlay: GridLoadingOverlay,
            NoRowsOverlay: GridNoRowsOverlay,
          }}
          loading={isLoading}
        />
      </Box>
    </div>
  );
}

export default Roles;
