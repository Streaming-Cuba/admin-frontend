import React, {useEffect, useMemo, useRef, LegacyRef} from "react";
import {useAppSelector} from "../../../redux";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import PageTitle from "../../../components/PageTitle";
import Video from "../../../types/Video";
import {Redirect} from "react-router-dom";
import {Paths} from "../../";
import useStyles from "./styles";
import {secondsToString,} from "../../../utils/FormatUtils";
import {Movie as MovieIcon} from "mdi-material-ui";
import DemographyTable from "../../../components/DemographyTable";
import RegionsTopTable from "../../../components/RegionsTopTable";
import CountriesTopTable from "../../../components/CountriesTopTable";
import { clearVideos } from "../../../redux/reducers/metrics";
import ReactionTable from "../../../components/ReactionsTable";
// @ts-ignore
import ReactToPdf from "react-to-pdf"
import { jsPDF } from "jspdf";
//import html2canvas from "html2canvas"

interface pdfParams {
  toPdf: () => any
}

function FacebookMetricsReport(): JSX.Element {
  const videos: Video[] = useAppSelector((state) => state.metrics.videos);
  const dispatch = useDispatch();
  const classes = useStyles();
  const pdfRef = useRef(null)


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
            demographic: {
              "F.13-17":
                  previousValue.demographic["F.13-17"] +
                  currentValue.demographic["F.13-17"],
              "F.18-24":
                  previousValue.demographic["F.18-24"] +
                  currentValue.demographic["F.18-24"],
              "F.25-34":
                  previousValue.demographic["F.25-34"] +
                  currentValue.demographic["F.25-34"],
              "F.35-44":
                  previousValue.demographic["F.35-44"] +
                  currentValue.demographic["F.35-44"],
              "F.45-54":
                  previousValue.demographic["F.45-54"] +
                  currentValue.demographic["F.45-54"],
              "F.55-64":
                  previousValue.demographic["F.55-64"] +
                  currentValue.demographic["F.55-64"],
              "F.65+":
                  previousValue.demographic["F.65+"] +
                  currentValue.demographic["F.65+"],
              "M.13-17":
                  previousValue.demographic["M.13-17"] +
                  currentValue.demographic["M.13-17"],
              "M.18-24":
                  previousValue.demographic["M.18-24"] +
                  currentValue.demographic["M.18-24"],
              "M.25-34":
                  previousValue.demographic["M.25-34"] +
                  currentValue.demographic["M.25-34"],
              "M.35-44":
                  previousValue.demographic["M.35-44"] +
                  currentValue.demographic["M.35-44"],
              "M.45-54":
                  previousValue.demographic["M.45-54"] +
                  currentValue.demographic["M.45-54"],
              "M.55-64":
                  previousValue.demographic["M.55-64"] +
                  currentValue.demographic["M.55-64"],
              "M.65+":
                  previousValue.demographic["M.65+"] +
                  currentValue.demographic["M.65+"],
            },
            comments: previousValue.comments + currentValue.comments,
            shares: previousValue.shares + currentValue.shares,
            crosspost_count: previousValue.crosspost_count + currentValue.crosspost_count,
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
      }
  }, [])

  const pdfOptions = {
    orientation: 'portrait',
    unit: 'in',
    format: [36,12]
  };

  useEffect(() => (
      () => {
        dispatch(clearVideos());
      }
  ), [])

  const printDocument = async ()  => {
    const input = document.getElementById('divToPrint');
    const doc = new jsPDF();
    doc.setLanguage("es");
    await doc.html(input as HTMLElement, {
      x: 0.6,
      y: 0.6,
      margin: [150, 150, 150, 150],
      html2canvas: {
        allowTaint: true,
        async: true,
        scale: 0.3,
        useCORS: true,
        scrollX: 30,
        scrollY: 20,
        taintTest: true,
        letterRendering: false,
      },
      callback: (doc) => {
        doc.save("test.pdf")
      }
    })


    /*
    html2canvas(input as HTMLElement)
        .then((canvas) => {
          console.log(canvas)
          const imgData = canvas.toDataURL('image/png');
          console.log(imgData)
          const pdf = new jsPDF();
          // @ts-ignore
          pdf.addImage(imgData, 'JPEG', 0, 0);
          // pdf.output('dataurlnewwindow');
          pdf.save("download.pdf");
        })
    ;
     */
  }

  if (videos.length > 0)
    return (
      <>
        <div ref={pdfRef} id={"divToPrint"}>
          <PageTitle title="Estadíticas de Videos Seleccionados" />
          <div className={classes.layout}>
            <TableContainer className={classes.container}>
              <Table title="Totales">
                <TableHead>
                  <Typography>Totales</Typography>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Alcance Total:</TableCell>
                    <TableCell align="right">{totals.reach}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Vistas Totales:</TableCell>
                    <TableCell align="right">{totals.views}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Duración Total:</TableCell>
                    <TableCell align="right">
                      {secondsToString(totals.length)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer className={classes.container}>
              {secondsToString(totals.demographic["F.13-17"]) ===
              "NaN:NaN:NaN" ? (
                  <Typography>
                    Algunos de los videos seleccionados no tiene estadísticas
                    demográficas
                  </Typography>
              ) : (
                  <DemographyTable demographic={totals.demographic} />
              )}
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
            <TableContainer className={classes.container}>
              <Table>
                <TableHead>
                  <Typography>Otras Estadísticas</Typography>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Cantidad de Comentarios:</TableCell>
                    <TableCell align="right">{totals.comments}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cantidad de Veces Compartido:</TableCell>
                    <TableCell align="right">{totals.shares}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cantidad de Páginas Enlazadas:</TableCell>
                    <TableCell align="right">{totals.crosspost_count}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

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
          </div>
        </div>
        <ReactToPdf
            targetRef={pdfRef}
            options={pdfOptions}
            filename="Reporte.pdf"
            x={1} y={1} scale={0.9}
        >
          {
            (params: pdfParams) => {
              return (
                  <button onClick={params.toPdf}>Generate pdf</button>
              );
            }}
        </ReactToPdf>
        <button onClick={printDocument}>Generar PDF a mano</button>
      </>
    );

  return <Redirect to={Paths.StatisticsMetrics} />;
}

export default FacebookMetricsReport;
