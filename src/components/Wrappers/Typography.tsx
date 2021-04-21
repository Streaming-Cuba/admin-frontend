import React from "react";
import {Typography as TypographyBase, useTheme} from "@material-ui/core";

import {getColor, getFontSize, getFontWeight} from "./Utils";
import {BrightnessType, Color, Size} from "../../types/Color";
import {Variant} from "@material-ui/core/styles/createTypography";

function Typography(props: TypographyProps) {

  const {color, colorBrightness, children, variant, size, weight, ...rest} = props;

  let theme = useTheme();

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, theme, variant),
      }}
      {...rest}
    >
      {props.children}
    </TypographyBase>
  );
}

export default Typography;


interface TypographyProps {
  children: JSX.Element | React.ReactNode;
  weight?: "light" | "medium" | "bold" | undefined;
  size?: Size;
  colorBrightness?: BrightnessType,
  color?: Color;
  variant?: Variant | undefined;
  [item: string]: any;
}