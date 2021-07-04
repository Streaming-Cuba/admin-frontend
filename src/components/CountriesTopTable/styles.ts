import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cellWithImg: {
    display: "flex",
    alignItems: "center",

    "& img": {
      marginRight: 5,
    },
  },
}));

export default useStyles;
