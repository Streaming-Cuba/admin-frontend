import React, {useEffect, useState} from "react";
import {Box, Grid, TextField,} from "@material-ui/core";
import PageTitle from "../../../components/PageTitle";
import {useServerManager} from "../../../components/ServerManagerProvider";
import Event from "../../../types/Event";
import {useParams} from "react-router";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function CreateEvent() {
    //const classes = useStyles();
    //const theme = useTheme();
    //const history = useHistory();
    const serverManager = useServerManager();

    //const params = useParams<{ identifier: string }>();

    const [isLoading, setLoading] = useState(true);
    const [event, setEvent] = useState<Event>({
        identifier:"",
        name: ""
    });

    const handleModelChange = () => {
    };

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
                    <Grid item xs={12}>
                        <FroalaEditor
                            model={event.description}
                            onModelChange={handleChangeText("description")}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}