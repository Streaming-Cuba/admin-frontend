import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  layout: {
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  container: {
    marginTop: "3em",
  },
  cellWithImg: {
    display: "flex",
    alignItems: "center",

    "& img": {
      marginRight: 5,
    }
  },
}));
