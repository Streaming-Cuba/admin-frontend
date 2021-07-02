import React, { useCallback, useEffect, useMemo, useState } from "react";
import GridLoadingOverlay from "../../../components/Grid/LoadingOverlay";
import GridNoRowsOverlay from "../../../components/Grid/NoRowsOverlay";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import PageTitle from "../../../components/PageTitle";
import { Box, Grid, IconButton, TextField } from "@material-ui/core";
import {
  DateRange,
  DateRangeDelimiter,
  MobileDateRangePicker,
} from "@material-ui/pickers";
import { useServerManager } from "../../../components/ServerManagerProvider";
import { format, parseISO } from "date-fns";
import Video from "../../../types/Video";
import VideosInfo from "../../../types/VideosInfo";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import MoreDialog from "../../../components/MoreDialog";
import {
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Assignment as AssignmentIcon,
} from "@material-ui/icons";
import useStyles from "./styles";
import TotalDialog from "../../../components/TotalsDialog";
import { useDispatch } from "react-redux";
import {
  setVideoReports,
  removeVideoReports,
} from "../../../redux/reducers/metrics";
import { useHistory } from "react-router";
import { Paths } from "../..";
import { useAppSelector } from "../../../redux";

function Metrics() {
  const serverManager = useServerManager();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const videosToReport = useAppSelector((state) => state.metrics.videos.length);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange<any>>([null, null]);
  const [videosInfo, setVideosInfo] = useState<VideosInfo>({
    videos_count: 0,
    total_reach: 0,
    total_views: 0,
    total_countries: 0,
    total_regions: 0,
    videos: [],
    ranking_by_region: {},
    ranking_by_country: {},
  });
  const [isOpenMoreDialog, setIsOpenMoreDialog] = useState<boolean>(false);
  const [isOpenTotalDialog, setIsOpenTotalDialog] = useState<boolean>(false);
  const [videoToMore, setVideoToMore] = useState<Video>({
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
    demographic: {
      "F.13-17": 0,
      "F.18-24": 0,
      "F.25-34": 0,
      "F.35-44": 0,
      "F.45-54": 0,
      "F.55-64": 0,
      "F.65+": 0,
      "M.13-17": 0,
      "M.18-24": 0,
      "M.25-34": 0,
      "M.35-44": 0,
      "M.45-54": 0,
      "M.55-64": 0,
      "M.65+": 0,
    },
    length: 0,
    reach: 0,
    views: 0,
    date:"",
    ranking_by_country: {},
    ranking_by_region: {}
  });

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

  const secondsToString = (seconds: number): string => {
    const second = Math.round(seconds % 0x3c).toString();
    const hour = Math.floor(seconds / 0xe10).toString();
    const minute = (Math.floor(seconds / 0x3c) % 0x3c).toString();

    return hour + ":" + minute + ":" + second;
  };

  const handleClickVariant = useCallback(
    (text: string, variant: VariantType) => () => {
      enqueueSnackbar(text, { variant });
    },
    [enqueueSnackbar]
  );

  const loadInfo = useCallback(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setLoading(true);
      serverManager
        .loadVideosInfo(
          format(dateRange[0], "yyyy-MM-dd"),
          format(dateRange[1], "yyyy-MM-dd")
        )
        .then((r) => {
          r.data.videos.forEach((video: Video, index) => {
            video.id = index;
            video.date = format(parseISO(video.date), "dd-MM-yyyy");
            video.duration = secondsToString(video.length);
            video.more = "Demografía";
            video.parsedDemographic = {
              "F.13-17": secondsToString(video.demographic["F.13-17"] / 1000),
              "F.18-24": secondsToString(video.demographic["F.18-24"] / 1000),
              "F.25-34": secondsToString(video.demographic["F.25-34"] / 1000),
              "F.35-44": secondsToString(video.demographic["F.35-44"] / 1000),
              "F.45-54": secondsToString(video.demographic["F.45-54"] / 1000),
              "F.55-64": secondsToString(video.demographic["F.55-64"] / 1000),
              "F.65+": secondsToString(video.demographic["F.65+"] / 1000),
              "M.13-17": secondsToString(video.demographic["M.13-17"] / 1000),
              "M.18-24": secondsToString(video.demographic["M.18-24"] / 1000),
              "M.25-34": secondsToString(video.demographic["M.25-34"] / 1000),
              "M.35-44": secondsToString(video.demographic["M.35-44"] / 1000),
              "M.45-54": secondsToString(video.demographic["M.45-54"] / 1000),
              "M.55-64": secondsToString(video.demographic["M.55-64"] / 1000),
              "M.65+": secondsToString(video.demographic["M.65+"] / 1000),
            };
          });
          setVideosInfo(r.data);
        })
        .catch(() => {
          handleClickVariant("Error en el rango de fecha", "error")();
          setVideosInfo({
            videos_count: 0,
            total_reach: 0,
            total_views: 0,
            total_countries: 0,
            total_regions: 0,
            videos: [],
            ranking_by_region: {},
            ranking_by_country: {},
          });
        })
        .finally(() => setLoading(false));
    }
  }, [dateRange, handleClickVariant, serverManager]);

  useEffect(() => {
    loadInfo();
  }, [dateRange, loadInfo]);

  return (
    <div>
      <PageTitle title="Estadisticas: Métricas de Facebook">
        {videosInfo.videos_count > 0 && (
          <>
            {videosToReport > 0 && (
              <IconButton onClick={() => history.push(Paths.MetricsReport)}>
                <AssignmentIcon />
              </IconButton>
            )}
            {/*
            <Button
              variant={"outlined"}
              onClick={() => setIsOpenTotalDialog(true)}
            >
              Totales
            </Button>
            */}
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
      <TotalDialog
        videosInfo={videosInfo}
        isOpen={isOpenTotalDialog}
        onClose={() => setIsOpenTotalDialog(false)}
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
        rows={videosInfo.videos}
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
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        loading={isLoading}
        autoHeight
        disableSelectionOnClick
        checkboxSelection
        onRowSelected={(param) => {
          if (param.isSelected) dispatch(setVideoReports(param.data));
          else dispatch(removeVideoReports(param.data));
        }}
        onCellClick={(param) => {
          if (param.field === "more") {
            setVideoToMore(param.row as Video)
            setIsOpenMoreDialog(true);
          }
        }}
        components={{
          LoadingOverlay: GridLoadingOverlay,
          NoRowsOverlay: GridNoRowsOverlay,
        }}
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
