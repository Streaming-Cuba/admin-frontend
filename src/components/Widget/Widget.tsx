import React, { useMemo, useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import clsx from "clsx";

// styles
import useStyles from "./styles";

export default function Widget(props: WidgetProps) {
  const {
    children,
    title,
    noBodyPadding,
    bodyClass,
    disableWidgetMenu,
    header,
    noHeaderPadding,
    headerClass,
    style,
    noWidgetShadow,
    ...rest
  } = props;

  var classes = useStyles();

  // local
  var [moreButtonRef, setMoreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  const headerClasses = useMemo(() => {
    let result = {
      [classes.noPadding]: noHeaderPadding,
    };
    if (headerClass) result[headerClass] = Boolean(headerClass);
    return result;
  }, [headerClass]);

  const bodyClasses = useMemo(() => {
    let result = {
      [classes.noPadding]: noBodyPadding,
    };
    if (bodyClass) result[bodyClass] = Boolean(bodyClass);
    return result;
  }, [bodyClass]);

  return (
    <div className={classes.widgetWrapper} style={style && { ...style }}>
      <Paper
        className={classes.paper}
        classes={{
          root: clsx(classes.widgetRoot, {
            [classes.noWidgetShadow]: noWidgetShadow,
          }),
        }}
      >
        <div className={clsx(classes.widgetHeader, headerClasses)}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary" noWrap>
                {title}
              </Typography>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  buttonRef={setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </React.Fragment>
          )}
        </div>
        <div className={clsx(classes.widgetBody, bodyClasses)}>{children}</div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        <MenuItem>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Print</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

interface WidgetProps {
  children?: React.ReactNode | React.ReactNodeArray;
  title?: string;
  noBodyPadding?: boolean;
  bodyClass?: string;
  disableWidgetMenu?: boolean;
  header?: React.ReactNode | React.ReactNodeArray;
  noHeaderPadding?: boolean;
  headerClass?: string;
  style?: { [item: string]: boolean | string | number };
  noWidgetShadow?: boolean;
  [item: string]: any;
}
