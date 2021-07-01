import React, {useEffect, useState} from "react";
import { useAppSelector } from "../../../redux";
import {
    List, ListItem, ListItemIcon, ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { clearVideos } from "../../../redux/reducers/metrics";
import PageTitle from "../../../components/PageTitle";
import Video from "../../../types/Video";
import {useHistory} from "react-router-dom";
import {Paths} from "../../";
import useStyles from "./styles"


function FacebookMetricsReport(): JSX.Element {
    const videos = useAppSelector((state) => state.metrics.videos);
    const dispatch = useDispatch();
    const history = useHistory()
    const classes = useStyles()

    const [totals, setTotals] = useState<Video>({
        length: 0,
        reach: 0,
        views: 0,
        date:"",
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
        ranking_by_country: {},
        ranking_by_region: {},
    })

    const secondsToString = (seconds: number): string => {
        const second = Math.round(seconds % 0x3c).toString();
        const hour = Math.floor(seconds / 0xe10).toString();
        const minute = (Math.floor(seconds / 0x3c) % 0x3c).toString();

        return hour + ":" + minute + ":" + second;
    };

    useEffect(() => {

        if (videos.length > 0){

            const total = videos.reduce((previousValue, currentValue) => {

                const newCountries:{[key: string]: number} = {}
                Object
                    .keys(previousValue.ranking_by_country)
                    .forEach(
                        value => newCountries[value] = previousValue.ranking_by_country[value] + currentValue.ranking_by_country[value]
                    )

                const newRegion:{[key: string]: number} = {}
                Object
                    .keys(previousValue.ranking_by_region)
                    .forEach(
                        value => newRegion[value] = previousValue.ranking_by_region[value] + currentValue.ranking_by_region[value]
                    )

                return {
                    length: previousValue.length + currentValue.length,
                    views: previousValue.views + currentValue.views,
                    reach: previousValue.reach + currentValue.reach,
                    demographic: {
                        "F.13-17": previousValue.demographic["F.13-17"] + currentValue.demographic["F.13-17"],
                        "F.18-24": previousValue.demographic["F.18-24"] + currentValue.demographic["F.18-24"],
                        "F.25-34": previousValue.demographic["F.25-34"] + currentValue.demographic["F.25-34"],
                        "F.35-44": previousValue.demographic["F.35-44"] + currentValue.demographic["F.35-44"],
                        "F.45-54": previousValue.demographic["F.45-54"] + currentValue.demographic["F.45-54"],
                        "F.55-64": previousValue.demographic["F.55-64"] + currentValue.demographic["F.55-64"],
                        "F.65+": previousValue.demographic["F.65+"] + currentValue.demographic["F.65+"],
                        "M.13-17": previousValue.demographic["M.13-17"] + currentValue.demographic["M.13-17"],
                        "M.18-24": previousValue.demographic["M.18-24"] + currentValue.demographic["M.18-24"],
                        "M.25-34": previousValue.demographic["M.25-34"] + currentValue.demographic["M.25-34"],
                        "M.35-44": previousValue.demographic["M.35-44"] + currentValue.demographic["M.35-44"],
                        "M.45-54": previousValue.demographic["M.45-54"] + currentValue.demographic["M.45-54"],
                        "M.55-64": previousValue.demographic["M.55-64"] + currentValue.demographic["M.55-64"],
                        "M.65+": previousValue.demographic["M.65+"] + currentValue.demographic["M.65+"],
                    },
                    ranking_by_country: newCountries,
                    ranking_by_region: newRegion,
                    date: "",
                }})

            setTotals(total)

        } else
            history.goBack()
        return () => {
            dispatch(clearVideos())
        }
    }, []);

    if (videos.length > 0)
        return (
            <>
                <PageTitle title={"Estadíticas de Videos Seleccionados"}/>
                <div className={classes.layout}>
                    <TableContainer className={classes.container}>
                        <Table title={"Totales"}>
                            <TableHead>
                                <Typography>Totales</Typography>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Alcance Total:</TableCell>
                                    <TableCell>{totals.reach}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Vistas Totales:</TableCell>
                                    <TableCell>{totals.views}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Duración Total:</TableCell>
                                    <TableCell>{secondsToString(totals.length)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer className={classes.container}>
                        <Table>
                            <TableHead>
                                <Typography>Demografía</Typography>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>
                                        Femenino
                                    </TableCell>
                                    <TableCell>
                                        Masculino
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        13-17
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["F.13-17"])}
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["M.13-17"])}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        18-24
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["F.18-24"])}
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["M.18-24"])}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        25-34
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["F.25-34"])}
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["M.25-34"])}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        35-44
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["F.35-44"])}
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["M.35-44"])}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        45-54
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["F.45-54"])}
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["M.45-54"])}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        55-64
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["F.55-64"])}
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["M.55-64"])}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        65 +
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["F.65+"])}
                                    </TableCell>
                                    <TableCell>
                                        {secondsToString(totals.demographic["M.65+"])}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer className={classes.container}>
                        <Table>
                            <TableHead>
                                <Typography>5 Paises con mas tiempo de reproducción</Typography>
                            </TableHead>
                            <TableBody>
                                {Object.keys(totals.ranking_by_country)
                                    .sort((a, b) => (
                                        totals.ranking_by_country[b] - totals.ranking_by_country[a]
                                    ))
                                    .splice(0, 5)
                                    .map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{value}</TableCell>
                                                <TableCell>
                                                    {secondsToString(totals.ranking_by_country[value] * 60)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer  className={classes.container}>
                        <Table>
                            <TableHead>
                                <Typography>5 Regiones con mas tiempo de reproducción</Typography>
                            </TableHead>
                            <TableBody>
                                {Object.keys(totals.ranking_by_region)
                                    .sort((a, b) => (
                                        totals.ranking_by_region[b] - totals.ranking_by_region[a]
                                    ))
                                    .splice(0, 5)
                                    .map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{value}</TableCell>
                                                <TableCell>{secondsToString(totals.ranking_by_region[value]/1000)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <List className={classes.container}>
                        <Typography>Videos</Typography>
                        {
                            videos.map((video, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        -
                                    </ListItemIcon>
                                    <ListItemText>
                                        {video.title}
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
            </>
        );

    return (<PageTitle title={"No hay nada que mostrar aquí"}/>)
}

export default FacebookMetricsReport;
