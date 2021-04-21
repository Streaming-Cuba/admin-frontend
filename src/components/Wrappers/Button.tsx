import React from "react";
import {Button as ButtonBase, makeStyles} from "@material-ui/core";
import clsx from "clsx";
import {getColor} from "./Utils";
import {Color} from "../../types/Color";


function Button(props: ButtonProps) {
  const {children, color, className, ...rest} = props;


  const useStyle = makeStyles(theme => ({
    root: {
      color: getColor(color, theme),
    },
    contained: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.shadows[2],
      color: `${color ? "white" : theme.palette.text.primary} !important`,
      "&:hover": {
        backgroundColor: getColor(color, theme, "light"),
        boxShadow: theme.shadows[2],
      },
      "&:active": {
        boxShadow: theme.shadows[4]
      },
    },
    outlined: {
      color: getColor(color, theme),
      borderColor: getColor(color, theme),
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
  }))
  const classes = useStyle();

  return (
    <ButtonBase
      classes={{
        contained: classes.contained,
        root: classes.root,
        outlined: classes.outlined,
      }}
      {...rest}
      className={clsx(
        {
          [classes.select]: props.select,
        },
        className,
      )}
    >
      {children}
    </ButtonBase>
  );
}

type ButtonProps = {
  children: JSX.Element;
  color?: Color;
  className: string;
  select: boolean;
  [item: string]: any;
}

export default Button;
