import { useMemo } from "react";
import { Avatar, useTheme } from "@material-ui/core";
import { Typography } from "../Wrappers";
import { Color } from "../../types/Color";
import useStyles from "./styles";
import clsx from "clsx";

export default function UserAvatar(props: UserAvatarProps) {
  const { color = "primary", name = "", cover } = props;

  let classes = useStyles();
  let theme = useTheme();

  const letters = useMemo(() => {
    if (name)
      return name
        .split(" ")
        .map((word) => word[0])
        .join("");
  }, [name]);

  if (cover)
    return (
      <Avatar
        src={cover}
        className={clsx({
          [classes.lg]: props.size === "lg",
          [classes.normal]: !props.size,
        })}
      />
    );

  return (
    <Avatar
      src={cover}
      className={clsx(classes.text, {
        [classes.lg]: props.size === "lg",
        [classes.normal]: !props.size,
      })}
    >
      {letters}
    </Avatar>
  );
}

interface UserAvatarProps {
  color?: Color;
  name?: string;
  [item: string]: any;
  size?: "lg";
}
