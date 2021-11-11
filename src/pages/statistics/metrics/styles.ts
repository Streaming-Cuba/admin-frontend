import {makeStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    gridContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between"
    },
    root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    textField: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
}))

export default useStyles;