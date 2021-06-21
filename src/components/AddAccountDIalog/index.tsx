import React, {useEffect, useState} from "react"
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, LinearProgress,
    MenuItem,
    TextField, Typography
} from "@material-ui/core";
import useStyles from "./styles"
import {useServerManager} from "../ServerManagerProvider";
import Role from "../../types/Role";

interface AddAccountDialogProps {
    isOpen: boolean,
    onClose: () => void
}

interface FormData {
    email: string,
    password: string,
    name: string,
    lastName: string,
    rolId: number
}

export default function AddAccountDialog({isOpen, onClose}: AddAccountDialogProps): JSX.Element {

    const classes = useStyles()
    const serverManager = useServerManager()

    const [formData, setFormData] = useState<FormData>({
        email:'',
        lastName:'',
        name:'',
        password:'',
        rolId: 3
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [roles, setRoles] = useState<Role[]>([])

    const handleChangeText = (prop: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    const createAccount = () => {
        setLoading(true)
        serverManager.createAccount(formData)
            .then( () => onClose())
            .catch( () => setError(true))
            .finally( () => setLoading(false))
    }

    useEffect(() => {

        serverManager
            .loadRoles(1, 100)
            .then( r => setRoles(r.data))

        return () => {
            setFormData({
                email:'',
                lastName:'',
                name:'',
                password:'',
                rolId: 3
            })
        }
    }, [])

    return (
        <Dialog
            disableBackdropClick
            onClose={onClose}
            open={isOpen}
            fullWidth
        >
            <DialogTitle>
                Añadir Cuenta
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    variant={"outlined"}
                    label={"Nombre"}
                    className={classes.inputArea}
                    onChange={handleChangeText("name")}
                />
                <TextField
                    fullWidth
                    variant={"outlined"}
                    label={"Apellidos"}
                    className={classes.inputArea}
                    onChange={handleChangeText("lastName")}
                />
                <TextField
                    fullWidth
                    variant={"outlined"}
                    label={"Email"}
                    type={"email"}
                    className={classes.inputArea}
                    onChange={handleChangeText("email")}
                />
                <TextField
                    fullWidth
                    variant={"outlined"}
                    label={"Contraseña"}
                    type={"password"}
                    className={classes.inputArea}
                    onChange={handleChangeText("password")}
                />
                <TextField
                    select
                    label="Rol"
                    onChange={handleChangeText("rolId")}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                >
                    {
                        roles.map( (value, index) => (
                            <MenuItem key={index} value={ value.id }>{value.name}</MenuItem>
                        ))
                    }
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancelar
                </Button>
                <Button onClick={createAccount}>
                    Agregar
                </Button>
            </DialogActions>
            <DialogContent>
                {
                    error && (
                        <Typography color={"error"}>
                            Un error inesperado ha ocurrido
                        </Typography>
                    )
                }
                {
                    loading && (
                        <LinearProgress
                            variant="indeterminate"
                        />
                    )
                }
            </DialogContent>
        </Dialog>
    )
}