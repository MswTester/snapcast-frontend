import '@emotion/react';
import type { Theme as CustomTheme } from './ui/themes';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}