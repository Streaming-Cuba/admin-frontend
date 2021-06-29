import React, {useEffect, useState} from "react";
import {Box, Grid, MenuItem, TextField,} from "@material-ui/core";
import PageTitle from "../../../components/PageTitle";
import {useServerManager} from "../../../components/ServerManagerProvider";
import Event from "../../../types/Event";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import {
    DatePicker, DateRange, DateRangeDelimiter,
    DesktopDatePicker, MobileDateRangePicker
} from '@material-ui/pickers';
export default function CreateEvent() {
    //const classes = useStyles();
    //const theme = useTheme();
    //const history = useHistory();
    const serverManager = useServerManager();

    //const params = useParams<{ identifier: string }>();

    const [isLoading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange<any>>([null, null]);
    const [event, setEvent] = useState<Event>({
        identifier:"",
        name: "",
        endDate: null,
        startDate: null,
        categoryId: 0,
        statusId: 1
    });

    const categories: [] = []

    const handleChangeText = (prop: keyof Event) => (event: React.ChangeEvent<HTMLInputElement>) => {
       // setEvent({ ...event, [prop]: event.target.value });
    };

    return (
        <>
            <PageTitle title={"Crear un nuevo evento"}/>
            <Box>
                <Grid container spacing={4}>
                    <Grid item sm={6}>
                        <TextField
                            label="Nombre:"
                            variant="outlined"
                            value={event.name}
                            fullWidth
                            onChange={handleChangeText("name")}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            label="Identificador:"
                            variant="outlined"
                            value={event.identifier}
                            fullWidth
                            onChange={handleChangeText("identifier")}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            label="Subtitulo:"
                            variant="outlined"
                            value={event.subtitle}
                            fullWidth
                            onChange={handleChangeText("subtitle")}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            label="Orbanizador:"
                            variant="outlined"
                            value={event.organizer}
                            fullWidth
                            onChange={handleChangeText("organizer")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FroalaEditor
                            model={event.description}
                            onModelChange={handleChangeText("description")}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <MobileDateRangePicker
                            startText="Desde"
                            inputFormat="dd-MM-yyyy"
                            toolbarFormat="dd-MM-yyyy"
                            endText="Hasta"
                            value={dateRange}
                            allowSameDateSelection={true}
                            onChange={(newValue) => setDateRange(newValue)}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} helperText="" fullWidth />
                                    <DateRangeDelimiter> a </DateRangeDelimiter>
                                    <TextField {...endProps} helperText="" fullWidth />
                                </React.Fragment>
                            )}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            label="Localización:"
                            variant="outlined"
                            value={event.location}
                            fullWidth
                            onChange={handleChangeText("location")}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            select
                            label="Categoría"
                            onChange={handleChangeText("categoryId")}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                        >
                            {categories.map((category) => (
                                <MenuItem>{category}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            select
                            label="Estado"
                            onChange={handleChangeText("statusId")}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                        >
                            {categories.map((category) => (
                                <MenuItem>{category}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}