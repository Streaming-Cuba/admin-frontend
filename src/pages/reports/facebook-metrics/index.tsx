import React, {useEffect, useMemo} from "react";
import {useAppSelector} from "../../../redux";
import {
  Avatar, IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import PageTitle from "../../../components/PageTitle";
import VideoFB from "../../../types/VideoFB";
import {Redirect} from "react-router-dom";
import {Paths} from "../../";
import useStyles from "./styles";
import {secondsToString,} from "../../../utils/FormatUtils";
import {Movie as MovieIcon} from "mdi-material-ui";
import {CloudDownload as CloudDownloadIcon} from "@material-ui/icons"
import RegionsTopTable from "../../../components/RegionsTopTable";
import CountriesTopTable from "../../../components/CountriesTopTable";
import { clearVideos } from "../../../redux/reducers/metrics";
import ReactionTable from "../../../components/ReactionsTable";
import {saveAs} from "file-saver";

function FacebookMetricsReport(): JSX.Element {
  const videos: VideoFB[] = useAppSelector((state) => state.metrics.videos);
  const dispatch = useDispatch();
  const classes = useStyles();


  const totals = useMemo(() => {
    if (videos.length > 0) {
      return videos.reduce((previousValue, currentValue) => {
          const newCountries: { [key: string]: number } = JSON.parse(
              JSON.stringify(previousValue.ranking_by_country)
          );
          for (const countryKey in currentValue.ranking_by_country) {
            if (
                previousValue.ranking_by_country[countryKey] !== undefined &&
                currentValue.ranking_by_country[countryKey] !== undefined
            )
              newCountries[countryKey] =
                  previousValue.ranking_by_country[countryKey] +
                  currentValue.ranking_by_country[countryKey];
            if (
                previousValue.ranking_by_country[countryKey] === undefined &&
                currentValue.ranking_by_country[countryKey] !== undefined
            )
              newCountries[countryKey] =
                  currentValue.ranking_by_country[countryKey];
            if (
                previousValue.ranking_by_country[countryKey] !== undefined &&
                currentValue.ranking_by_country[countryKey] === undefined
            )
              newCountries[countryKey] =
                  previousValue.ranking_by_country[countryKey];
          }

          const newRegion: { [key: string]: number } = JSON.parse(
              JSON.stringify(previousValue.ranking_by_region)
          );
          for (const regionKey in currentValue.ranking_by_region) {
            if (
                previousValue.ranking_by_region[regionKey] !== undefined &&
                currentValue.ranking_by_region[regionKey] !== undefined
            )
              newRegion[regionKey] =
                  previousValue.ranking_by_region[regionKey] +
                  currentValue.ranking_by_region[regionKey];
            if (
                previousValue.ranking_by_region[regionKey] === undefined &&
                currentValue.ranking_by_region[regionKey] !== undefined
            )
              newRegion[regionKey] = currentValue.ranking_by_region[regionKey];
            if (
                previousValue.ranking_by_region[regionKey] !== undefined &&
                currentValue.ranking_by_region[regionKey] === undefined
            )
              newRegion[regionKey] = previousValue.ranking_by_region[regionKey];
          }

          const newReactions: { [key: string]: number } = JSON.parse(
              JSON.stringify(previousValue.reactions)
          );
          for (const reactionKey in currentValue.reactions) {
            if (
                previousValue.reactions[reactionKey] !== undefined &&
                currentValue.reactions[reactionKey] !== undefined
            )
              newReactions[reactionKey] =
                  previousValue.reactions[reactionKey] +
                  currentValue.reactions[reactionKey];
            if (
                previousValue.reactions[reactionKey] === undefined &&
                currentValue.reactions[reactionKey] !== undefined
            )
              newReactions[reactionKey] = currentValue.reactions[reactionKey];
            if (
                previousValue.reactions[reactionKey] !== undefined &&
                currentValue.reactions[reactionKey] === undefined
            )
              newReactions[reactionKey] = previousValue.reactions[reactionKey];
          }

          return {
            length: previousValue.length + currentValue.length,
            views: previousValue.views + currentValue.views,
            reach: previousValue.reach + currentValue.reach,
            comments: previousValue.comments + currentValue.comments,
            shares: previousValue.shares + currentValue.shares,
            total_view_time: previousValue.total_view_time + currentValue.total_view_time,
            crosspost_count: previousValue.crosspost_count > currentValue.crosspost_count? previousValue.crosspost_count : currentValue.crosspost_count,
            reactions: newReactions,
            ranking_by_country: newCountries,
            ranking_by_region: newRegion,
            date: "",
          };
        });
      }

    return {
      length: 0,
      reach: 0,
      views: 0,
      date: "",
      ranking_by_country: {},
      ranking_by_region: {},
      reactions: {
        love: 0,
        like: 0,
        haha: 0,
        wow: 0,
        sorry: 0,
        angry: 0,
      },
      shares: 0,
      comments: 0,
      crosspost_count: 0,
      total_view_time: 0
    }
  }, [videos])

  const downloadStatistics = () => {
    const downloadData: string[] = []

    downloadData.push("Informe de Audiencia \nCadena StreamingCuba \n140 páginas del Ministerio de Cultura y Medios de Comunicación\n\n")
    downloadData.push("Videos\n")
    videos.forEach(video => downloadData.push(`${video.title}\n`))
    downloadData.push(`\nCantidad de Publicaiones:\t${videos.length}\n`)
    downloadData.push(`Cantidad de Páginas Enlazadas:\t${totals.crosspost_count}\n`)
    downloadData.push(`Alcance Total:\t${totals.reach}\n`)
    downloadData.push(`Vistas Totales:\t${totals.views}\n`)
    downloadData.push(`Total de Paises:\t${Object.keys(totals.ranking_by_country).length}\n`)
    downloadData.push(`Total de Regiones:\t${Object.keys(totals.ranking_by_region).length}\n`)
    downloadData.push(`Total de Reacciones:\t${Object.values(totals.reactions).reduce((previousValue, currentValue) => previousValue + currentValue)}\n`)
    downloadData.push(`Cantidad de Comentarios:\t${totals.comments}\n`)
    downloadData.push(`Cantidad de Veces Compartidos:\t${totals.shares}\n`)
    downloadData.push(`Duración Total:\t${secondsToString(totals.length)}\n`)
    downloadData.push(`Minutos Totales reproducidos:\t${secondsToString(totals.total_view_time / 1000 || 0)}\n`)
    downloadData.push("\n10 Paises con más tiempo de reproducción:\n")
    Object.keys(totals.ranking_by_country)
        .sort((a, b) => totals.ranking_by_country[b] - totals.ranking_by_country[a])
        .splice(0, 10)
        .forEach(value => downloadData.push(`${value}\n`))
    downloadData.push("\n10 Regiones con más tiempo de reproducción:\n")
    Object.keys(totals.ranking_by_region)
        .sort((a, b) => totals.ranking_by_region[b] - totals.ranking_by_region[a])
        .splice(0, 10)
        .forEach(value => downloadData.push(`${value}\n`))
    downloadData.push("\nReacciones:\n")
    Object.keys(totals.reactions).forEach(value => downloadData.push(`${value.charAt(0).toUpperCase() + value.slice(1)}:\t${totals.reactions[value]}\n`))

    const blob = new Blob(downloadData)
    saveAs(blob, `Estadisticas de FB ${ new Date() } .txt`)
  }

  useEffect(() => (
      () => {
        dispatch(clearVideos());
      }
  ), [])

  if (videos.length > 0)
    return (
      <>
        <PageTitle title={"Informe de Audiencia \nCadena StreamingCuba \n140 páginas del Ministerio de Cultura y Medios de Comunicación"} >
          <IconButton onClick={() => downloadStatistics()}>
            <CloudDownloadIcon/>
          </IconButton>
        </PageTitle>
        <div className={classes.layout}>
          <List className={classes.container}>
            <Typography>Videos</Typography>
            {videos.map((video, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Avatar>
                      <MovieIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText>{video.title}</ListItemText>
                </ListItem>
            ))}
          </List>
          <TableContainer className={classes.container}>
            <Table title="Totales">
              <TableBody>
                <TableRow>
                  <TableCell>Cantidad de Publicaciones:</TableCell>
                  <TableCell align="right">{videos.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad de Páginas Enlazadas:</TableCell>
                  <TableCell align="right">{totals.crosspost_count}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Alcance Total:</TableCell>
                  <TableCell align="right">{totals.reach}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reproducciones:</TableCell>
                  <TableCell align="right">{totals.views}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total de Paises:</TableCell>
                  <TableCell align="right">{Object.keys(totals.ranking_by_country).length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total de Regiones:</TableCell>
                  <TableCell align="right">{Object.keys(totals.ranking_by_region).length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total de Reacciones:</TableCell>
                  <TableCell align="right">
                    {
                      Object
                          .values(totals.reactions)
                          .reduce((previousValue, currentValue) => previousValue + currentValue)
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad de Comentarios:</TableCell>
                  <TableCell align="right">{totals.comments}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cantidad de Veces Compartidos:</TableCell>
                  <TableCell align="right">{totals.shares}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Duración Total:</TableCell>
                  <TableCell align="right">
                    {secondsToString(totals.length)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tiempo Total de Reproducción:</TableCell>
                  <TableCell align="right">
                    {secondsToString(totals.total_view_time / 1000 || 0)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer className={classes.container}>
            <CountriesTopTable countries={totals.ranking_by_country} />
          </TableContainer>
          <TableContainer className={classes.container}>
            <RegionsTopTable regions={totals.ranking_by_region} />
          </TableContainer>
          <TableContainer className={classes.container}>
            <ReactionTable reactions={totals.reactions}/>
          </TableContainer>
        </div>
      </>
    );

  return <Redirect to={Paths.StatisticsMetrics} />;
}

export default FacebookMetricsReport;
