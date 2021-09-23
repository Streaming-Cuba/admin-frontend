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
    const downloadData: string[] = [
        `Cantidad de Publicaiones:\t${videos.length}
Cantidad de Páginas Enlazadas:\t${totals.crosspost_count}
Alcance Total:\t${totals.reach}
Vistas Totales:\t${totals.views}
Total de Paises:\t${Object.keys(totals.ranking_by_country).length}
Total de Regiones:\t${Object.keys(totals.ranking_by_region).length}
Total de Reacciones:\t${Object.values(totals.reactions).reduce((previousValue, currentValue) => previousValue + currentValue)}
Cantidad de Comentarios:\t${totals.comments}
Cantidad de Veces Compartidos:\t${totals.shares}
Duración Total:\t${totals.length}

10 Paises con más tiempo de reproducción:
${Object.keys(totals.ranking_by_country)[0]}
${Object.keys(totals.ranking_by_country)[1]}
${Object.keys(totals.ranking_by_country)[2]}
${Object.keys(totals.ranking_by_country)[3]}
${Object.keys(totals.ranking_by_country)[4]}
${Object.keys(totals.ranking_by_country)[5]}
${Object.keys(totals.ranking_by_country)[6]}
${Object.keys(totals.ranking_by_country)[7]}
${Object.keys(totals.ranking_by_country)[8]}
${Object.keys(totals.ranking_by_country)[9]}

10 Regiones con más tiempo de reproducción
${Object.keys(totals.ranking_by_region)[0]}
${Object.keys(totals.ranking_by_region)[1]}
${Object.keys(totals.ranking_by_region)[2]}
${Object.keys(totals.ranking_by_region)[3]}
${Object.keys(totals.ranking_by_region)[4]}
${Object.keys(totals.ranking_by_region)[5]}
${Object.keys(totals.ranking_by_region)[6]}
${Object.keys(totals.ranking_by_region)[7]}
${Object.keys(totals.ranking_by_region)[8]}
${Object.keys(totals.ranking_by_region)[9]}
 
Reacciones:\n`
    ]
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
                  <TableCell>Minutos Totales reproducidos:</TableCell>
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
