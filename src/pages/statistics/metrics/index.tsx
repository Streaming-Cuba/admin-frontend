import React, {useEffect, useMemo, useState} from "react";
import GridLoadingOverlay from "../../../components/Grid/LoadingOverlay";
import GridNoRowsOverlay from "../../../components/Grid/NoRowsOverlay";
import {DataGrid, GridColDef} from "@material-ui/data-grid";
import PageTitle from "../../../components/PageTitle";
import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import {useServerManager} from "../../../components/ServerManagerProvider";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {format, parseISO} from "date-fns"
import Video from "../../../types/Video";
import VideosInfo from "../../../types/VideosInfo";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';



function Metrics () {
    const serverManager = useServerManager();
    const {enqueueSnackbar} = useSnackbar();

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [since, setSince] = useState<MaterialUiPickersDate>(null)
    const [until, setUntil] = useState<MaterialUiPickersDate>(null)
    const [videosInfo, setVideosInfo] = useState<VideosInfo>({
        videos_count: 0,
        total_reach: 0,
        total_views: 0,
        total_countries: 0,
        total_regions: 0,
        videos: [],
        rankingByRegion: {},
        rankingByCountry: {}
    })

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
        ];
    }, [videosInfo.videos]);


    //se que esta no es la mejor forma pero fue lo mas rapido que se me ocurrió
    ////TODO cambiar por alguna fora de parseo de date-fns
    const secondsToString = (seconds: number) : string => {
        const second = (Math.round(seconds % 0x3C)).toString();
        const hour    = (Math.floor(seconds / 0xE10)).toString();
        const minute  = (Math.floor(seconds / 0x3C ) % 0x3C).toString();

        return hour + ':' + minute + ':' + second;
    }

    const loadInfo = () => {
        if (since !== null && until !== null){
            setLoading(true)
            serverManager
                .loadVideosInfo(
                    format(since, "yyyy-MM-dd"),
                    format(until,"yyyy-MM-dd")
                )
                .then(r => {
                    r.data.videos.forEach((video:Video, index) => {
                        video.id = index
                        video.date = format(parseISO(video.date),"dd-MM-yyyy")
                        video.duration = secondsToString(video.length)
                    })
                    setVideosInfo(r.data)
                })
                .catch( () => {
                    handleClickVariant("Error en el rango de fecha", "error")()
                    setVideosInfo({
                        videos_count: 0,
                        total_reach: 0,
                        total_views: 0,
                        total_countries: 0,
                        total_regions: 0,
                        videos: [],
                        rankingByRegion: {},
                        rankingByCountry: {}
                    })
                })
                .finally(() => setLoading(false))
        }
    }

    const handleClickVariant = (text: string, variant: VariantType) => () => {
        enqueueSnackbar(text, { variant });
    };


    useEffect(() => {
        loadInfo()
    }, [since, until])

    return(
        <MuiPickersUtilsProvider utils={ DateFnsUtils } locale={esLocale}>
            <div>
                <PageTitle title="Estadisticas: Métricas de los Videos">
                    <Box marginBottom={5}>
                        <Grid container spacing={4} >
                            <Grid item xs={4} sm={4}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Desde"
                                    format="MM/dd/yyyy"
                                    value={since}
                                    onChange={date => setSince(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    label="Hasta"
                                    format="MM/dd/yyyy"
                                    value={until}
                                    onChange={date => setUntil(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </PageTitle>
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
                <Grid container aria-orientation={"horizontal"} style={{padding: 5}} >
                    <Grid item xs={4} md={4} style={{padding: 5}}>
                        <TableContainer>
                            <Table title={"Totales"}>
                                <TableHead>
                                    <Typography>
                                        Totales
                                    </Typography>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Total de Videos
                                        </TableCell>
                                        <TableCell>
                                            {videosInfo.videos_count}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Alcance Total:
                                        </TableCell>
                                        <TableCell>
                                            {videosInfo.total_reach}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Total de Vistas:
                                        </TableCell>
                                        <TableCell>
                                            {videosInfo.total_views}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Total de Paises:
                                        </TableCell>
                                        <TableCell>
                                            {videosInfo.total_countries}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Total de Regiones:
                                        </TableCell>
                                        <TableCell>
                                            {videosInfo.total_regions}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={4} md={4} style={{padding: 5}}>
                        <Table>
                            <TableHead>
                                <Typography>
                                    5 Paises con mas vistas
                                </Typography>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(videosInfo.rankingByCountry).splice(0,5).map((value, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {value}
                                                    </TableCell>
                                                    <TableCell>
                                                        {videosInfo.rankingByCountry[value]}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={4} md={4} style={{padding: 5}}>
                        <Table>
                            <TableHead>
                                <Typography>
                                    5 Regiones con mas vistas
                                </Typography>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(videosInfo.rankingByRegion).splice(0,5).map((value, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {value}
                                                    </TableCell>
                                                    <TableCell>
                                                        {videosInfo.rankingByRegion[value]}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default function MetricWithSnack () {
    return(
        <SnackbarProvider maxSnack={3}>
            <Metrics/>
        </SnackbarProvider>
    )
}