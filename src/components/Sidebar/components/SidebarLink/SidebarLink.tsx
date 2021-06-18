import { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import Dot from "../Dot";
import useStyles from "./styles";
import { useTypedSelector } from "../../../../redux";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../../redux/reducers/layout";

type SidebarLinkProps = {
  id?: number;
  link: string;
  icon?: JSX.Element;
  label?: string;
  children?: {
    label: string;
    link: string;
  }[];
  type?: "divider" | "title";
  nested?: boolean;
  target?: string;
  classes?: any;
};

export default function SidebarLink(props: SidebarLinkProps) {
  const { link, icon, label, children, nested, type, target } = props;

  const classes = useStyles();
  const history = useHistory();
  const location = history.location;
  const dispatch = useDispatch();

  const isSidebarOpened = useTypedSelector(
    (state) => state.layout.isSidebarOpen
  );

  const [isOpen, setIsOpen] = useState(false);
  const isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  const toggleCollapse = (e: any) => {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const hideSidebar = () => {
    dispatch(toggleSidebar());
  }

  const openExternalLink = () => {
    let handle = window.open(link, target);
    handle?.blur();
    window.focus();
    hideSidebar();
  };

  const handleInternalNavigation = () => {
    history.push(link);
    hideSidebar();
  }

  if (type === "title")
    return (
      <Typography
        className={clsx(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;
  if (link && link.includes("http")) {
    return (
      <ListItem
        onClick={openExternalLink}
        button
        className={classes.link}
        classes={{
          root: clsx(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
      >
        <ListItemIcon
          className={clsx(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? (
            <Dot color={Boolean(isLinkActive) ? "primary" : undefined} />
          ) : (
            icon
          )}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: clsx(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
    );
  }
  if (!children)
    return (
      <ListItem
        button
        onClick={handleInternalNavigation}
        className={classes.link}
        classes={{
          root: clsx(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
      >
        <ListItemIcon
          className={clsx(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? <Dot color={isLinkActive ? "primary" : undefined} /> : icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: clsx(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
    );

  return (
    <>
      <ListItem
        button        
        onClick={toggleCollapse}
        className={classes.link}
        disableRipple
      >
        <ListItemIcon
          className={clsx(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon ? icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: clsx(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map((childrenLink) => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
