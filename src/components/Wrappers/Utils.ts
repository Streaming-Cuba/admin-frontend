import {Theme} from "@material-ui/core";
import {BrightnessType, Color, Size} from "../../types/Color";
import {Variant} from "@material-ui/core/styles/createTypography";

export function getFontWeight(style: "light" | "medium" | "bold" | undefined): number {
  switch (style) {
    case "light":
      return 300;
    case "medium":
      return 500;
    case "bold":
      return 600;
    default:
      return 400;
  }
}

export function getColor(color: Color, theme: Theme, brightness: BrightnessType = "main"): string | undefined {
  if (color && theme.palette[color] && theme.palette[color][brightness]) {
    return theme.palette[color][brightness];
  }
}

export function getFontSize(size: Size, theme: Theme, variant?: Variant) {
  let multiplier;

  switch (size) {
    case 'sm':
      multiplier = 0.8;
      break;
    case 'md':
      multiplier = 1.5;
      break;
    case 'xl':
      multiplier = 2;
      break;
    case 'lg':
      multiplier = 3;
      break;
    default:
      multiplier = 1;
      break;
  }

  let defaultSize = variant && theme.typography[variant]
    ? theme.typography[variant].fontSize
    : theme.typography.fontSize + "px";

  return `calc(${defaultSize} * ${multiplier})`;
}
