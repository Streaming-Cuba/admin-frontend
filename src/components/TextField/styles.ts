import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
    border: 0,
    transition: "box-shadow .15s ease",
    marginBottom: "1rem",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    // flexWrap: "none",
    alignItems: "stretch",
    width: "100%",
  },
  input: {
    display: "block",
    width: "100%",
    height: "calc(1.5em + 1.25rem + 2px)",
    padding: "0.625rem 0.75rem",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.5",
    color: "#8898aa",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: 0,
    borderRadius: "0.375rem",
    boxShadow: "none",
    transition: "all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    position: "relative",
    flex: "1 1 auto",
    minWidth: 0,
    marginBottom: 0,

    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.625rem 0.75rem',
    marginBottom: 0,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#adb5bd',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    backgroundColor: 'white',
    border: 'none',
  },

}));

export default useStyles;
