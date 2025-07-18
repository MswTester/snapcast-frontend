import styled from "@emotion/styled";
import type { Theme } from "../../themes/types";
import { parseSize } from "../../utils";
import type { Size } from "../../types";

export interface InputProps {
    w?: Size;
    h?: Size;
}

export const Input = styled.input<InputProps & { theme: Theme }>`
    display: inline-block;
    width: ${p => p.w ? parseSize(p.w, p.theme) : 'auto'};
    height: ${p => p.h ? parseSize(p.h, p.theme) : 'auto'};
    padding: ${p => p.theme.dimensions.lg} ${p => p.theme.dimensions.lg};
    background-color: ${p => p.theme.colors.background};
    color: ${p => p.theme.colors.onSurface};
    border: 1px solid ${p => p.theme.colors.outline};
    border-radius: ${p => p.theme.dimensions.md};
    font-family: ${p => p.theme.typography.bodyLarge.fontFamily};
    font-size: ${p => p.theme.typography.bodyLarge.fontSize};
    font-weight: ${p => p.theme.typography.bodyLarge.fontWeight};
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        color: ${p => p.theme.colors.onBackground};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`