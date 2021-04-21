import { useTheme } from "@material-ui/core";
import clsx from "clsx";
import { Color, Size } from "../../../../types/Color";
import useStyles from "./styles";

export default function Dot(props: DotProp) {
  const { color, size } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      className={clsx(classes.dotBase, {
        [classes.dotLarge]: size === "xl",
        [classes.dotSmall]: size === "sm",
      })}
      style={{
        backgroundColor:
          color && theme.palette[color] && theme.palette[color].main,
      }}
    />
  );
}

interface DotProp {
  size?: Size;
  color?: Color;
}
