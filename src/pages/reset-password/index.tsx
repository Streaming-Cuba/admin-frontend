import React, {useState} from "react"
import {Button, Card, Container, InputAdornment, LinearProgress, TextField, Typography} from "@material-ui/core";
import {VpnKey as VpnKeyIcon} from "@material-ui/icons";
import useStyles from "./styles";

interface ResetPasswordForm {
    password: string|null,
    rePassword: string|null
}

export default function ResetPassword(): JSX.Element {

    const classes = useStyles()

    const [resetPasswordForm, setResetPasswordForm] = useState<ResetPasswordForm>({
        password: null,
        rePassword: null
    })

    const handleChangeText = (prop: keyof ResetPasswordForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setResetPasswordForm({ ...resetPasswordForm, [prop]: event.target.value });
    };

    return (
        <div className={classes.root}>
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <Typography variant="h4" className={classes.title}>
                        StreamingCuba
                    </Typography>
                    <Typography variant="h5" color="primary" align="center">
                        Establecer Contraseña
                    </Typography>
                    <br />
                    <br />
                    <TextField
                        value={resetPasswordForm.password}
                        onChange={handleChangeText("password")}
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
                    <TextField
                        value={resetPasswordForm.rePassword}
                        onChange={handleChangeText("rePassword")}
                        label="Repetir Contraseña"
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
                    {
                        (resetPasswordForm.password !== resetPasswordForm.rePassword) ? (
                            <Typography color={"error"} align={"center"}>
                                Las contraseñas no son iguales
                            </Typography>
                        ) : null
                    }
                    <Button
                        autoFocus
                        //onClick={handleSignIn}
                        disabled={
                            !resetPasswordForm.password ||
                            !resetPasswordForm.rePassword ||
                            (resetPasswordForm.password !== resetPasswordForm.rePassword)}
                        variant="contained"
                        color="primary"
                        className={classes.signInButton}
                    >
                        Aceptar
                    </Button>
                    {false && (
                        <LinearProgress
                            variant="indeterminate"
                            className={classes.progress}
                        />
                    )}
                </Card>
            </Container>
        </div>
    )
}