import type { Theme } from "./types";
import { lightColors, darkColors } from "./color";
import { typography } from "./typography";
import { dimensions } from "./dimen";

export const lightTheme: Theme = {
  type: 'light',
  colors: lightColors,
  typography,
  dimensions,
};

export const darkTheme: Theme = {
  type: 'dark',
  colors: darkColors,
  typography,
  dimensions,
};

export * from "./types";
