import { useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
  GridCellParams,
} from "@material-ui/data-grid";
import { useTheme } from "@material-ui/styles";
import {
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  OpenInNew as OpenInNewIcon,
  Description as DescriptionIcon,
} from "@material-ui/icons";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import { useServerManager } from "../../components/ServerManagerProvider";
import Event from "../../types/Event";
import * as PlatformUtils from "../../utils/PlatformUtils";
import { useHistory } from "react-router-dom";
import GridLoadingOverlay from "../../components/Grid/LoadingOverlay";
import GridNoRowsOverlay from "../../components/Grid/NoRowsOverlay";

export default function Events() {
  const classes = useStyles();
  const theme = useTheme();
  const serverManager = useServerManager();
  const history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [moreActionsMenuAnchorEl, setMoreActionsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<Event | null>(null);

  const refresh = () => {
    setLoading(true);
    serverManager
      .loadEvents(currentPage, pageSize)
      .then((response) => {
        setEvents(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleMoreActionsClick = (
    event: React.MouseEvent<HTMLElement>,
    row: Event
  ) => {
    event.stopPropagation();
    setSelectedRow(row);
    setMoreActionsMenuAnchorEl(event.currentTarget);
  };

  const handleMoreActionsMenuClose = () => {
    setMoreActionsMenuAnchorEl(null);
  };

  const columns = useMemo<GridColDef[]>(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.3 },
      { field: "name", headerName: "Nombre", flex: 1 },
      { field: "identifier", headerName: "Identificador", flex: 1 },
      {
        field: "",
        headerName: "Acciones",
        align: "right",
        flex: 0.3,
        renderCell: (params: GridCellParams) => {
          return (
            <IconButton
              onClick={(e) =>
                handleMoreActionsClick(e, events[params.rowIndex])
              }
            >
              <MoreVertIcon />
            </IconButton>
          );
        },
      },
    ];
  }, [events]);

  const openInPlatform = () => {
    if (selectedRow) {
      PlatformUtils.openEvent(selectedRow.identifier);
    }
  };

  const goToEventDetails = () => {
    if (selectedRow) {
      history.push(`/event/${selectedRow.identifier}/details`);
    }
  };
  const goToEventEdit = () => {
    if (selectedRow) {
      history.push(`/event/${selectedRow.identifier}/edit`);
    }
  };

  return (
    <>
      <PageTitle title="Eventos">
        <IconButton onClick={refresh}>
          <RefreshIcon />
        </IconButton>
      </PageTitle>

      <Box width="100%" height="70vh">
        <DataGrid
          rows={events}
          columns={columns}
          checkboxSelection
          components={{
            LoadingOverlay: GridLoadingOverlay,
            NoRowsOverlay: GridNoRowsOverlay,
          }}
          loading={isLoading}
        />
      </Box>

      <Menu
        id="long-menu"
        anchorEl={moreActionsMenuAnchorEl}
        keepMounted
        open={Boolean(moreActionsMenuAnchorEl)}
        onClose={handleMoreActionsMenuClose}
      >
        <MenuItem onClick={goToEventDetails}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Ver detalles</Typography>
        </MenuItem>
        <MenuItem onClick={openInPlatform}>
          <ListItemIcon>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Ver en la plataforma</Typography>
        </MenuItem>
        <MenuItem onClick={goToEventEdit}>
          <ListItemIcon >
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Editar</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
