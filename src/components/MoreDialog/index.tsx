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
    TableHead,
    TableBody,
    Typography,
    IconButton
} from "@material-ui/core";
import {
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon
} from "@material-ui/icons"
import { TransitionProps } from '@material-ui/core/transitions';
import Video from "../../types/Video";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface MoreDialogProps {
    isOpen: boolean,
    video: Video,
    onClose: () => void
}

export default function MoreDialog (props: MoreDialogProps): JSX.Element {

    const [currentPage, setCurrentPage] = useState<1|2>(1)

    return (
        <Dialog
            TransitionComponent={Transition}
            open={props.isOpen}
            fullWidth
            disableBackdropClick
        >
            {
                currentPage === 1 && (
                    <div>
                        <DialogTitle>Estadísticas Demográficas</DialogTitle>
                        <DialogContent>
                            {
                                props.video?.parsedDemographic?.["M.13-17"] === "NaN:NaN:NaN"? (
                                    <Typography>
                                        Este video no tiene estadísticas demográficas
                                    </Typography>
                                ) : (
                                    <Table>
                                        <TableHead>
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
                                                    {props.video?.parsedDemographic?.["F.13-17"]}
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["M.13-17"]}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    18-24
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["F.18-24"]}
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["M.18-24"]}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    25-34
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["F.25-34"]}
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["M.25-34"]}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    35-44
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["F.35-44"]}
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["M.35-44"]}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    45-54
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["F.45-54"]}
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["M.45-54"]}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    55-64
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["F.55-64"]}
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["M.55-64"]}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    65 +
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["F.65+"]}
                                                </TableCell>
                                                <TableCell>
                                                    {props.video?.parsedDemographic?.["M.65+"]}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                )
                            }
                        </DialogContent>
                    </div>
                )
            }
            {
                currentPage === 2 && (
                    <div>
                        <DialogTitle>Otras Estadísticas</DialogTitle>
                        <DialogContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Cantidad de Comentarios:
                                        </TableCell>
                                        <TableCell>
                                            {props.video.comments}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Cantidad de Veces Compartido:
                                        </TableCell>
                                        <TableCell>
                                            {props.video.shares}
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
                                    {
                                        Object
                                            .keys(props.video.reactions)
                                            .map((value, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {value.charAt(0).toUpperCase() + value.slice(1)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.video.reactions[value]}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    }
                                </TableBody>
                            </Table>
                        </DialogContent>
                    </div>
                )
            }
            <DialogActions>
                <IconButton
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                >
                    <KeyboardArrowLeftIcon/>
                </IconButton>
                <IconButton
                    onClick={() => setCurrentPage(2)}
                    disabled={currentPage === 2}
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