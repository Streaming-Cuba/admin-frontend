import {Badge as BadgeBase, makeStyles} from "@material-ui/core";
import React from "react";
import {BrightnessType, Color} from "../../types/Color";
import {getColor} from "./Utils";
import clsx from "clsx";

function Badge(props: BadgeProps) {

  const {color, colorBrightness, children, ...rest} = props;

  const useStyle = makeStyles(theme => ({
    badge: {
      fontWeight: 600,
      height: 16,
      minWidth: 16,
      backgroundColor: getColor(color, theme, colorBrightness),
    },
  }));
  const classes = useStyle();

  return (
    <BadgeBase
      classes={{
        badge: clsx(classes.badge, classes.badge),
      }}
      {...rest}
    >
      {children}
    </BadgeBase>
  );
}

interface BadgeProps {
  children: JSX.Element;
  colorBrightness?: BrightnessType;
  color: Color;

  [items: string]: any;
}

export default Badge;

