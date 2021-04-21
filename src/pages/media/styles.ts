import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  mediaContainer: {
    height: '100%',
    width: '100%',
  },
  folderButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    minWidth: 250,
    maxWidth: 250,
    boxShadow: theme.shadows[1],
    margin: 3,
    padding: 7,
  },
  folderIcon: {
    width: "2.3rem",
    height: "2.3rem",
    color: theme.palette.primary.main,
    opacity: 0.8,
  },
  folderName: {
    fontSize: "14px",
    color: theme.palette.primary.main,
    marginLeft: 5,
    maxWidth: "100%",
  },
  mediaItemContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minWidth: 250,
    maxWidth: 250,
    boxShadow: theme.shadows[1],
    margin: 3,
    padding: 7,
  },
  mediaItemIcon: {
    maxWidth: "100%",
    maxHeight: "120px",
    minHeight: 120,
  },
  mediaItemName: {
    fontSize: "14px",
    color: theme.palette.primary.main,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  assetsContainer: {
    marginTop: 20,
  },
  dragOverlay: {
    display: 'none',
    border: "dashed grey 4px",
    backgroundColor: "rgba(255,255,255,.8)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  dragOverlayVisible: {
    display: "block",
  },
  dragOverlayContent: {
    position: "absolute",
    top: "50%",
    right: 0,
    left: 0,
    textAlign: "center",
    color: "grey",
    fontSize: 36,
  },
}));
