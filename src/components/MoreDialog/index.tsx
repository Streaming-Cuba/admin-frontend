import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TableCell,
    TableRow,
    Table,
    TableBody,
    Typography,
    IconButton
} from "@material-ui/core";
import {
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon
} from "@material-ui/icons"
import { TransitionProps } from '@material-ui/core/transitions';
import VideoFB from "../../types/VideoFB";
import DemographyTable from "../DemographyTable";
import CountriesTopTable from "../CountriesTopTable";
import RegionsTopTable from "../RegionsTopTable";
import ReactionTable from "../ReactionsTable";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface MoreDialogProps {
    isOpen: boolean,
    video: VideoFB,
    onClose: () => void
}

export default function MoreDialog (props: MoreDialogProps): JSX.Element {

    const [currentPage, setCurrentPage] = useState<number>(1)

    return (
        <Dialog
            TransitionComponent={Transition}
            open={props.isOpen}
            fullWidth
            disableBackdropClick
        >
            {
                currentPage === 1 && (
                    <>
                        <DialogTitle>Otras Estadísticas</DialogTitle>
                        <DialogContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Cantidad de Páginas Enlazadas:
                                        </TableCell>
                                        <TableCell>
                                            {props.video.crosspost_count || 0}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Total de Paises:
                                        </TableCell>
                                        <TableCell>
                                            {
                                                Object
                                                    .keys(props.video.ranking_by_country)
                                                    .length
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Total de Regiones:
                                        </TableCell>
                                        <TableCell>
                                            {
                                                Object
                                                    .keys(props.video.ranking_by_region)
                                                    .length
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Total de Reacciones:
                                        </TableCell>
                                        <TableCell>
                                            {
                                                Object
                                                    .values(props.video.reactions)
                                                    .reduce((previousValue, currentValue) => previousValue + currentValue)
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Cantidad de Comentarios:
                                        </TableCell>
                                        <TableCell>
                                            {props.video.comments || 0}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Cantidad de Veces Compartido:
                                        </TableCell>
                                        <TableCell>
                                            {props.video.shares || 0}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </DialogContent>
                    </>
                )
            }
            {
                currentPage === 2 && (
                    <>
                        <DialogTitle>
                            5 Paises con más tiempo de reproducción
                        </DialogTitle>
                        <DialogContent>
                            <CountriesTopTable countries={props.video.ranking_by_country} disableTitle/>
                        </DialogContent>
                    </>
                )
            }
            {
                currentPage === 3 && (
                    <>
                        <DialogTitle>
                            5 Regiones con más tiempo de reproducción
                        </DialogTitle>
                        <DialogContent>
                            <RegionsTopTable regions={props.video.ranking_by_region} disableTitle/>
                        </DialogContent>
                    </>
                )
            }
            {
                currentPage === 4 && (
                    <>
                        <DialogTitle>Reacciones</DialogTitle>
                        <DialogContent>
                            <ReactionTable reactions={props.video.reactions} disableTitle />
                        </DialogContent>
                    </>
                )
            }
            {
                currentPage === 5 && (
                    <>
                        <DialogTitle>Estadísticas Demográficas</DialogTitle>
                        <DialogContent>
                            {
                                !props.video.demographic["M.13-17"]? (
                                    <Typography>
                                        Este video no tiene estadísticas demográficas
                                    </Typography>
                                ) : (
                                    <DemographyTable demographic={props.video.demographic} disableTitle />
                                )
                            }
                        </DialogContent>
                    </>
                )
            }
            <DialogActions>
                <IconButton
                    onClick={() => setCurrentPage(prevState => prevState - 1)}
                    disabled={currentPage === 1}
                >
                    <KeyboardArrowLeftIcon/>
                </IconButton>
                <IconButton
                    onClick={() => setCurrentPage(prevState => prevState + 1)}
                    disabled={currentPage === 5}
                >
                    <KeyboardArrowRightIcon/>
                </IconButton>
                <Button onClick={() => {
                    props.onClose()
                    setCurrentPage(1)
                }} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
