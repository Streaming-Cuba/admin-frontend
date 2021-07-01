import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Typography
} from "@material-ui/core"
import {TransitionProps} from "@material-ui/core/transitions";
import VideosInfo from "../../types/VideosInfo";

interface TotalDialogProps {
    videosInfo: VideosInfo,
    isOpen: boolean,
    onClose: () => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TotalDialog (props: TotalDialogProps): JSX.Element {

    const secondsToString = (seconds: number): string => {
        const second = Math.round(seconds % 0x3c).toString();
        const hour = Math.floor(seconds / 0xe10).toString();
        const minute = (Math.floor(seconds / 0x3c) % 0x3c).toString();

        return hour + ":" + minute + ":" + second;
    };

    return (
        <Dialog
            fullWidth
            maxWidth={"xl"}
            TransitionComponent={Transition}
            open={props.isOpen}
            keepMounted={false}
            onClose={() => props.onClose()}
        >
            <DialogContent>
                <DialogTitle>
                    Totales
                </DialogTitle>
                <Grid container aria-orientation={"horizontal"} style={{ padding: 5 }}>
                    <Grid item xs={4} md={4} style={{ padding: 5 }}>
                        <TableContainer>
                            <Table title={"Totales"}>
                                <TableHead>
                                    <Typography>Totales</Typography>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Total de Videos</TableCell>
                                        <TableCell>{props.videosInfo.videos_count}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Alcance Total:</TableCell>
                                        <TableCell>{props.videosInfo.total_reach}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total de Vistas:</TableCell>
                                        <TableCell>{props.videosInfo.total_views}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total de Paises:</TableCell>
                                        <TableCell>{props.videosInfo.total_countries}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total de Regiones:</TableCell>
                                        <TableCell>{props.videosInfo.total_regions}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={4} md={4} style={{ padding: 5 }}>
                        <Table>
                            <TableHead>
                                <Typography>5 Paises con mas tiempo de reproducción</Typography>
                            </TableHead>
                            <TableBody>
                                {Object.keys(props.videosInfo.ranking_by_country)
                                    .sort((a, b) => (
                                        props.videosInfo.ranking_by_country[b] - props.videosInfo.ranking_by_country[a]
                                    ))
                                    .splice(0, 5)
                                    .map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{value}</TableCell>
                                                <TableCell>
                                                    {secondsToString(props.videosInfo.ranking_by_country[value] * 60)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={4} md={4} style={{ padding: 5 }}>
                        <Table>
                            <TableHead>
                                <Typography>5 Regiones con mas tiempo de reproducción</Typography>
                            </TableHead>
                            <TableBody>
                                {Object.keys(props.videosInfo.ranking_by_region)
                                    .sort((a, b) => (
                                        props.videosInfo.ranking_by_region[b] - props.videosInfo.ranking_by_region[a]
                                    ))
                                    .splice(0, 5)
                                    .map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{value}</TableCell>
                                                <TableCell>{secondsToString(props.videosInfo.ranking_by_region[value]/1000)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}