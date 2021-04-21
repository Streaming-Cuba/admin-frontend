import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import { withRouter } from "react-router-dom";
import { Drawer, IconButton, List, useTheme } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";

import clsx from "clsx";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

import {useTypedSelector} from '../../redux'
import {toggleSidebar} from '../../redux/reducers/layout';


import structure from './structure';


function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  var isSidebarOpen = useTypedSelector(state => state.layout.isSidebarOpen);
  const dispatch = useDispatch();

  const [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpen,
        [classes.drawerClose]: !isSidebarOpen,
      })}
      open={isSidebarOpen}
      onBackdropClick={() => dispatch(toggleSidebar())}
    >
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => dispatch(toggleSidebar())}>
          <ArrowBackIcon
            classes={{
              root: clsx(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
