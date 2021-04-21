import React, {useEffect, useMemo, useState} from "react";
import {Box, Grid, IconButton, TextField, Tooltip,} from "@material-ui/core";
import {Edit as EditIcon} from "@material-ui/icons";
import {useTheme} from "@material-ui/styles";
import PageTitle from "../../../components/PageTitle";
import useStyles from "./styles";
import {useServerManager} from "../../../components/ServerManagerProvider";
import Event from "../../../types/Event";
import {useHistory, useParams} from "react-router";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function EventDetails() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const serverManager = useServerManager();

  const params = useParams<{ identifier: string }>();

  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    setLoading(true);
    serverManager
      .loadEventByIdentifier(params.identifier)
      .then((response) => {
        setEvent(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleModelChange = () => {
  };

  if (isLoading || !event) return <>
    <LoadingOverlay/>
  </>

  return (
    <>
      <PageTitle title={event.name}/>

      <Box>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <TextField
              disabled
              label="Nombre:"
              variant="outlined"
              value={event.name}
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              disabled
              label="Identificador:"
              variant="outlined"
              value={event.identifier}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FroalaEditor
              model={event.description}
              onModelChange={handleModelChange}
              config={{
                events: {
                  initialized() {
                    const editor: any = this;
                    editor.edit.off();
                  }
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
