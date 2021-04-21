import { makeStyles } from "@material-ui/core";

const drawerWidth = 340;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    // width: drawerWidth,
  },
  drawerClose: {
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidebarList: {
    overflowX: 'hidden',
    minWidth: drawerWidth,
  }, 
  mobileBackButton: {
    marginLeft: 18,
  },
}));
