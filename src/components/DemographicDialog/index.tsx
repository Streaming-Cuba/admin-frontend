import React from "react";
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
    TableBody, Typography
} from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import ParsedDemographic from "../../types/ParseDemographic";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface DemographicDialogProps {
    isOpen: boolean,
    videoDemographic: ParsedDemographic,
    onClose: () => void
}

export default function DemographicDialog (props: DemographicDialogProps): JSX.Element {

    return (
        <Dialog
            TransitionComponent={Transition}
            open={props.isOpen}
            keepMounted={false}
            onClose={() => props.onClose()}
        >
            <DialogTitle>Estadísticas Demográficas</DialogTitle>
            <DialogContent>
                {
                    props.videoDemographic["M.13-17"] === "NaN:NaN:NaN"? (
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
                                        {props.videoDemographic["F.13-17"]}
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["M.13-17"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        18-24
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["F.18-24"]}
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["M.18-24"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        25-34
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["F.25-34"]}
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["M.25-34"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        35-44
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["F.35-44"]}
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["M.35-44"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        45-54
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["F.45-54"]}
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["M.45-54"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        55-64
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["F.55-64"]}
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["M.55-64"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        65 +
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["F.65+"]}
                                    </TableCell>
                                    <TableCell>
                                        {props.videoDemographic["M.65+"]}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}