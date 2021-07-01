import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Fab,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import clsx from "clsx";

import useStyles from "./styles";

import { Typography } from "../Wrappers";
import Notification from "../Notification";
import UserAvatar from "../UserAvatar";

import { useTypedSelector } from "../../redux";
import { toggleSidebar } from "../../redux/reducers/layout";
import { signOut } from "../../redux/reducers/account";

import { Paths } from "../../pages";

function Header(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const account = useTypedSelector((state) => state.account.account);
  const layoutState = useTypedSelector((state) => state.layout);
  const messages = useTypedSelector((state) => state.account.messages);
  const notifications = useTypedSelector(
    (state) => state.account.notifications
  );

  const [mailMenu, setMailMenu] = useState<HTMLElement | null>(null);
 // const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [notificationsMenu, setNotificationsMenu] =
    useState<HTMLElement | null>(null);
 // const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState<HTMLElement | null>(null);
 // const [isSearchOpen, setSearchOpen] = useState(false);

  const goToAccountPage = () => {
    setProfileMenu(null);
    history.push(Paths.Account);
  };

  const goToSettingsPage = () => {
    setProfileMenu(null);
    history.push(Paths.Settings);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => dispatch(toggleSidebar())}
          className={clsx(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse
          )}
        >
          {layoutState.isSidebarOpen ? (
            <ArrowBackIcon
              classes={{
                root: clsx(classes.headerIcon, classes.headerIconCollapse),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: clsx(classes.headerIcon, classes.headerIconCollapse),
              }}
            />
          )}
        </IconButton>
        <Typography
            variant="h6"
            weight="medium"
            className={classes.logotype}
            component={Link}
            to={"/dashboard"}
        >
          StreamingCuba
        </Typography>
        <div className={classes.grow} />

        {/* <div
          className={clsx(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={clsx(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> */}
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              New Messages
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map((message) => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm">{message.time}</Typography>
              </div>
              <div
                className={clsx(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography>{message.message}</Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <UserAvatar
              cover={account?.avatarPath}
              name={`${account?.name} ${account?.lastName}`}
              size="lg"
            />
            <Typography variant="h5" weight="medium">
              {account?.name}
            </Typography>
            <Typography color="primary">{account?.email}</Typography>
          </div>
          <MenuItem
            onClick={goToAccountPage}
            className={clsx(classes.profileMenuItem, classes.headerMenuItem)}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Cuenta de
            usuario
          </MenuItem>
          {/* <MenuItem
            onClick={goToSettingsPage}
            className={clsx(classes.profileMenuItem, classes.headerMenuItem)}
          >
            <SettingsIcon className={classes.profileMenuIcon} /> Configuración
          </MenuItem> */}
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() =>  dispatch(signOut())}
            >
              Salir
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
