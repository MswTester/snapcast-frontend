import { css } from "@emotion/react";
import type { TypographyStyle } from "../themes";

export const applyTypography = (style: TypographyStyle) => css`
    font-family: ${style.fontFamily};
    font-size: ${style.fontSize};
    font-weight: ${style.fontWeight};
    line-height: ${style.lineHeight};
    letter-spacing: ${style.letterSpacing};
`;
