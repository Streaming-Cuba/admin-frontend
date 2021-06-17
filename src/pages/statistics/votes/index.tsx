import React, { useMemo, useState, useEffect } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import {
  Tooltip,
  IconButton,
  Box,
  Grid,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

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
import useStyles from "./styles";
import Vote from "../../../types/Vote";
import Event from "../../../types/Event";

function StatisticsVotes() {
  const classes = useStyles();
  const serverManager = useServerManager();

  const [isLoading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventSelected, setEventSelected] = useState<string | null>(null);
  const [voteTypeSelected, setVoteTypeSelected] = useState<string | null>(null);

  const loadVotes = () => {
    if (eventSelected && voteTypeSelected) {
      setLoading(true);
      serverManager
        .loadVotes(eventSelected, voteTypeSelected, pageSize)
        .then((response) => {
          setVotes(response.data)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const loadEvents = () => {
    setLoading(true);
    serverManager
      .loadEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    loadVotes();
  }, [eventSelected, voteTypeSelected, pageSize]);

  const columns = useMemo<GridColDef[]>(() => {
    return [
      { field: "id", headerName: "ID", flex: 0.3 },
      {
        field: "groupItemName",
        headerName: "Nombre",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
      },
      {
        field: "interpreter",
        headerName: "Intérprete",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
      },
      {
        field: "count",
        headerName: "Votos",
        disableColumnMenu: true,
        sortable: false,
        flex: 0.3,
      },
      
    ];
  }, []);

  return (
    <div>
      <PageTitle title="Estadisticas: Votos por evento">
        <IconButton onClick={loadVotes}>
          <RefreshIcon />
        </IconButton>
      </PageTitle>

      <Box marginBottom={5}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={3}>
            <TextField
              select
              label="Evento"
              value={eventSelected}
              onChange={(e) => setEventSelected(e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
            >
              {events.map((event) => (
                <MenuItem value={event.identifier}>{event.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              select
              label="Tipo de voto"
              value={voteTypeSelected}
              onChange={(e) => setVoteTypeSelected(e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
            >
              <MenuItem value="default">Voto popular</MenuItem>
              <MenuItem value="special">Voto institucional</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <div className={classes.dataGrid}>
        <DataGrid
          rows={votes}
          columns={columns}
          rowCount={total}
          page={currentPage}
          pageSize={pageSize}
          onPageChange={(params) => {
            setCurrentPage(params.page);
          }}
          onPageSizeChange={(params) => {
            setPageSize(params.pageSize);
          }}
          rowsPerPageOptions={[10, 25, 50]}
          paginationMode="server"
          pagination
          loading={isLoading}
          autoHeight
          disableSelectionOnClick
          components={{
            LoadingOverlay: GridLoadingOverlay,
            NoRowsOverlay: GridNoRowsOverlay,
          }}
        />
      </div>
    </div>
  );
}

export default StatisticsVotes;
