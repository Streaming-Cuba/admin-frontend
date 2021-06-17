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
                            <Typography>5 Paises con mas vistas</Typography>
                        </TableHead>
                        <TableBody>
                            {Object.keys(props.videosInfo.rankingByCountry)
                                .sort((a, b) => (
                                    props.videosInfo.rankingByCountry[b] - props.videosInfo.rankingByCountry[a]
                                ))
                                .splice(0, 5)
                                .map((value, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{value}</TableCell>
                                            <TableCell>
                                                {secondsToString(props.videosInfo.rankingByCountry[value])}
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
                            <Typography>5 Regiones con mas vistas</Typography>
                        </TableHead>
                        <TableBody>
                            {Object.keys(props.videosInfo.rankingByRegion)
                                .sort((a, b) => (
                                    props.videosInfo.rankingByRegion[b] - props.videosInfo.rankingByRegion[a]
                                ))
                                .splice(0, 5)
                                .map((value, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{value}</TableCell>
                                            <TableCell>{secondsToString(props.videosInfo.rankingByRegion[value]/1000)}</TableCell>
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