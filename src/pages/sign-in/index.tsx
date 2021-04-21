import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
  InputAdornment,
  LinearProgress,
} from "@material-ui/core";
import { Person as PersonIcon, VpnKey as VpnKeyIcon } from "@material-ui/icons";
import { useState } from "react";
import { useServerManager } from "../../components/ServerManagerProvider";
import CookiesManager from "../../apis/cookies";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { setToken } from "../../redux/reducers/account";

function SignIn() {
  const classes = useStyles();
  const serverManager = useServerManager();
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    setLoading(true);
    serverManager
      .signIn(username, password)
      .then(async (response) => {
        CookiesManager.setToken(response.data.token);
        dispatch(setToken(response.data.token));
        serverManager.refreshInstance();

        history.replace("/dashboard");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            StreamingCuba
          </Typography>
          <Typography variant="h5" color="primary" align="center">
            Portal Administrativo
          </Typography>
          <br />
          <br />
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Nombre de usuario"
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            autoFocus
            onClick={handleSignIn}
            disabled={!username || !password || loading}
            variant="contained"
            color="primary"
            className={classes.signInButton}
          >
            Entrar
          </Button>
          {loading && (
            <LinearProgress
              variant="indeterminate"
              className={classes.progress}
            />
          )}
        </Card>
      </Container>
    </div>
  );
}

export default SignIn;
