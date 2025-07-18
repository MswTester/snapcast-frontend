import { css } from '@emotion/react';
import type { Typography } from "./types";

const fontFamily = '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

export const fontFaces = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('../../assets/fonts/Pretendard-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('../../assets/fonts/Pretendard-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('../../assets/fonts/Pretendard-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('../../assets/fonts/Pretendard-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
`;

const weights = {
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
} as const;

export const typography: Typography = {
  displayLarge: {
    fontFamily,
    fontSize: '40px',
    fontWeight: weights.extraBold,
    lineHeight: '48px',
    letterSpacing: '0px',
  },
  displayMedium: {
    fontFamily,
    fontSize: '36px',
    fontWeight: weights.extraBold,
    lineHeight: '44px',
    letterSpacing: '0px',
  },
  displaySmall: {
    fontFamily,
    fontSize: '32px',
    fontWeight: weights.extraBold,
    lineHeight: '40px',
    letterSpacing: '0px',
  },

  headlineLarge: {
    fontFamily,
    fontSize: '28px',
    fontWeight: weights.bold,
    lineHeight: '34px',
    letterSpacing: '0px',
  },
  headlineMedium: {
    fontFamily,
    fontSize: '24px',
    fontWeight: weights.bold,
    lineHeight: '28px',
    letterSpacing: '0px',
  },
  headlineSmall: {
    fontFamily,
    fontSize: '20px',
    fontWeight: weights.bold,
    lineHeight: '24px',
    letterSpacing: '0px',
  },
  
  titleLarge: {
    fontFamily,
    fontSize: '18px',
    fontWeight: weights.semiBold,
    lineHeight: '22px',
    letterSpacing: '0px',
  },
  titleMedium: {
    fontFamily,
    fontSize: '16px',
    fontWeight: weights.semiBold,
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  titleSmall: {
    fontFamily,
    fontSize: '14px',
    fontWeight: weights.semiBold,
    lineHeight: '18px',
    letterSpacing: '0px',
  },
  
  bodyLarge: {
    fontFamily,
    fontSize: '16px',
    fontWeight: weights.medium,
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  bodyMedium: {
    fontFamily,
    fontSize: '14px',
    fontWeight: weights.medium,
    lineHeight: '18px',
    letterSpacing: '0px',
  },
  bodySmall: {
    fontFamily,
    fontSize: '12px',
    fontWeight: weights.medium,
    lineHeight: '16px',
    letterSpacing: '0px',
  },
};
