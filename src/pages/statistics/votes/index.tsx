import React, {useMemo, useState, useEffect, useCallback} from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import {
  IconButton,
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";

import PageTitle from "../../../components/PageTitle";
import {
  Assignment as AssignmentIcon,
  Refresh as RefreshIcon,
} from "@material-ui/icons";
import GridLoadingOverlay from "../../../components/Grid/LoadingOverlay";
import GridNoRowsOverlay from "../../../components/Grid/NoRowsOverlay";
import { useServerManager } from "../../../components/ServerManagerProvider";
import useStyles from "./styles";
import Vote from "../../../types/Vote";
import Event from "../../../types/Event";
import Video from "../../../types/Video";
import { saveAs } from "file-saver"

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
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVotes = useCallback(() => {
    if (eventSelected && voteTypeSelected) {
      setLoading(true);
      serverManager
        .loadVotes(eventSelected, voteTypeSelected)
        .then((response) => {
          const _videos: Video[] = []
          response.data
              .sort((a, b) => b.count - a.count)
              .forEach((item, index) => {
            _videos.push({
              ...JSON.parse(item.metadata), count: item.count,  id: index + 1
            });
          })
          setVotes(response.data)
          setVideos(_videos)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [eventSelected, pageSize, serverManager, voteTypeSelected]);

  const loadEvents = useCallback(() => {
    setLoading(true);
    serverManager
      .loadEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [serverManager])

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    loadVotes();
  }, [eventSelected, voteTypeSelected, pageSize, loadVotes]);

  const columns = useMemo<GridColDef[]>(() => {
    return eventSelected === "premioslucas2021"? [
      { field: "id", headerName: "Posición", flex: 0.3 },
      {
        field: "Number",
        headerName: "Número",
        disableColumnMenu: true,
        sortable: false,
        flex: 0.3,
      },
      {
        field: "Title",
        headerName: "Título",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
      },
      {
        field: "Author",
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
    ] : [
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
  }, [eventSelected]);

  const downloadVotes = () => {
    const downloadData: string[] = ["Posición\tNúmero\tVotos\tInérprete\tTitulo\n"]
    videos.forEach(value => downloadData.push(`${value.id}\t${value.Number}\t${value.count}\t${value.Author}\t${value.Title}\n`))
    const blob = new Blob(downloadData)
    saveAs(blob, `Votaciones Premios Lucas ${ new Date() } .txt`)
  }

  return (
    <div>
      <PageTitle title="Estadisticas: Votos por evento">
        {
         videos.length > 0 &&
         <IconButton onClick={downloadVotes}>
           <AssignmentIcon />
         </IconButton>
        }
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
          rows={eventSelected === "premioslucas2021"? videos :votes}
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
          paginationMode="client"
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
