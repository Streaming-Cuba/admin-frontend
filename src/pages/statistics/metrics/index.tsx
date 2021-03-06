import React, { useCallback, useEffect, useMemo, useState } from "react";
import GridLoadingOverlay from "../../../components/Grid/LoadingOverlay";
import GridNoRowsOverlay from "../../../components/Grid/NoRowsOverlay";
import {
  DataGrid,
  GridColDef, GridRowId
} from "@material-ui/data-grid";
import PageTitle from "../../../components/PageTitle";
import { Box, Grid, IconButton, TextField } from "@material-ui/core";
import {
  DateRange,
  DateRangeDelimiter,
  MobileDateRangePicker,
} from "@material-ui/pickers";
import { useServerManager } from "../../../components/ServerManagerProvider";
import { format, parseISO } from "date-fns";
import VideoFB from "../../../types/VideoFB";
import VideosInfo from "../../../types/VideosInfo";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import MoreDialog from "../../../components/MoreDialog";
import {
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Assignment as AssignmentIcon,
    Search as SearchIcon,
    Clear as ClearIcon
} from "@material-ui/icons";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import {
  setVideoReports,
} from "../../../redux/reducers/metrics";
import { useHistory } from "react-router";
import { Paths } from "../..";
import { secondsToString } from "../../../utils/FormatUtils";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <TextField
            variant="standard"
            value={props.value}
            onChange={props.onChange}
            placeholder="Search…"
            className={classes.textField}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
              endAdornment: (
                  <IconButton
                      title="Clear"
                      aria-label="Clear"
                      size="small"
                      style={{ visibility: props.value ? 'visible' : 'hidden' }}
                      onClick={props.clearSearch}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
              ),
            }}
        />
      </div>
  );
}

function Metrics() {
  const serverManager = useServerManager();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(500);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange<any>>([null, null]);
  const [selectionModel, setSelectionMode] = useState<GridRowId[]>([])
  const [videosInfo, setVideosInfo] = useState<VideosInfo>({
    videos_count: 0,
    videos: [],
  });
  const [isOpenMoreDialog, setIsOpenMoreDialog] = useState<boolean>(false);
  const [videoToMore, setVideoToMore] = useState<VideoFB>({
    reactions: {
      like: 0,
      love: 0,
      wow: 0,
      haha: 0,
      sorry: 0,
      angry: 0,
    },
    comments: 0,
    shares: 0,
    length: 0,
    reach: 0,
    views: 0,
    date: "",
    ranking_by_country: {},
    ranking_by_region: {},
    crosspost_count: 0,
    total_view_time: 0
  });
  const [searchText, setSearchText] = useState<string>('');
  const [rows, setRows] = useState<VideoFB[]>([])

  const columns = useMemo<GridColDef[]>(() => {
    return [
      {
        field: "title",
        headerName: "Titulo",
        disableColumnMenu: true,
        sortable: false,
        flex: 2,
      },
      {
        field: "date",
        headerName: "Fecha",
        disableColumnMenu: true,
        sortable: false,
        flex: 0.3,
      },
      {
        field: "reach",
        headerName: "Alcance",
        disableColumnMenu: true,
        sortable: false,
        flex: 0.3,
      },
      {
        field: "views",
        headerName: "Vistas",
        disableColumnMenu: true,
        sortable: false,
        flex: 0.3,
      },
      {
        field: "duration",
        headerName: "Duración",
        disableColumnMenu: true,
        sortable: false,
        flex: 0.3,
      },
      {
        field: "more",
        headerName: "Mas",
        disableColumnMenu: true,
        sortable: false,
        flex: 0.18,
        renderCell: () => <MoreVertIcon />,
      },
    ];
  }, []);

  const handleClickVariant = useCallback(
    (text: string, variant: VariantType) => () => {
      enqueueSnackbar(text, { variant });
    },
    [enqueueSnackbar]
  );

  const loadInfo = () => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setLoading(true);
      serverManager
        .loadVideosInfo(
          format(dateRange[0], "yyyy-MM-dd"),
          format(dateRange[1], "yyyy-MM-dd")
        )
        .then((r) => {
          r.data.videos.forEach((video: VideoFB, index) => {
            video.id = index;
            video.date = format(parseISO(video.date), "dd-MM-yyyy");
            video.duration = secondsToString(video.length);
            video.more = "Más";
          });
          setVideosInfo(r.data);
          setRows(r.data.videos);
        })
        .catch(() => {
          handleClickVariant("Error en el rango de fecha", "error")();
          setVideosInfo({
            videos_count: 0,
            videos: [],
          });
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const refresh = () => {
    loadInfo();
  };

  const goToReport = () => {
    selectionModel.forEach(id => {
      videosInfo
          .videos
          .filter(video => video.id === id)
          .forEach(video => dispatch(setVideoReports(video)))
    })
    history.push(Paths.MetricsReport)
  }

  function escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = videosInfo.videos.filter((video: VideoFB) => {
      return searchRegex.test(video?.title as string);
    });
    setRows(filteredRows);
  };

  return (
    <div>
      <PageTitle title="Estadisticas: Métricas de Facebook">
        {videosInfo.videos_count > 0 && (
          <>
            {selectionModel.length > 0 && (
              <IconButton onClick={goToReport}>
                <AssignmentIcon />
              </IconButton>
            )}
          </>
        )}
        <IconButton onClick={loadInfo}>
          <RefreshIcon />
        </IconButton>
      </PageTitle>
      <MoreDialog
        isOpen={isOpenMoreDialog}
        video={videoToMore}
        onClose={() => setIsOpenMoreDialog(false)}
      />
      <Box marginBottom={5}>
        <Grid container spacing={4} className={classes.gridContainer}>
          <Grid item xs={12} sm={6}>
            <MobileDateRangePicker
              startText="Desde"
              inputFormat="dd-MM-yyyy"
              toolbarFormat="dd-MM-yyyy"
              endText="Hasta"
              value={dateRange}
              allowSameDateSelection={true}
              onChange={(newValue) => setDateRange(newValue)}
              onClose={refresh}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} helperText="" fullWidth />
                  <DateRangeDelimiter> a </DateRangeDelimiter>
                  <TextField {...endProps} helperText="" fullWidth />
                </React.Fragment>
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={videosInfo.videos_count}
        page={currentPage}
        pageSize={pageSize}
        onPageChange={(params) => {
          setCurrentPage(params.page);
        }}
        onPageSizeChange={(params) => {
          setPageSize(params.pageSize);
        }}
        rowsPerPageOptions={[500, 750, 1000]}
        pagination
        loading={isLoading}
        autoHeight
        disableSelectionOnClick
        checkboxSelection
        onCellClick={(param) => {
          if (param.field === "more") {
            setVideoToMore(param.row as VideoFB);
            setIsOpenMoreDialog(true);
          }
        }}
        components={{
          LoadingOverlay: GridLoadingOverlay,
          NoRowsOverlay: GridNoRowsOverlay,
          Toolbar: QuickSearchToolbar
        }}
        filterMode={"client"}
        filterModel={{
          items: [
            {
              columnField: 'title',
              operatorValue: 'contains',
              value: ''
            },
          ],
        }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
        onSelectionModelChange={(params) => setSelectionMode(params.selectionModel)}
      />
    </div>
  );
}

export default function MetricWithSnack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Metrics />
    </SnackbarProvider>
  );
}
