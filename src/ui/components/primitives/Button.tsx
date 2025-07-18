import styled from "@emotion/styled";
import type { Theme } from "../../themes/types";
import { css } from "@emotion/react";
import { parseColor, parseSize } from "../../utils";
import type { Size } from "../../types";

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    w?: Size;
    h?: Size;
    color?: string;
    pv?: Size;
    ph?: Size;
    radius?: Size;
}

export const Button = styled.button<ButtonProps & { theme: Theme }>`
    display: inline-block;
    width: ${p => p.w ? parseSize(p.w, p.theme) : 'auto'};
    height: ${p => p.h ? parseSize(p.h, p.theme) : 'auto'};
    padding: ${p => p.pv ? parseSize(p.pv, p.theme) : p.theme.dimensions.sm} ${p => p.ph ? parseSize(p.ph, p.theme) : p.theme.dimensions.md};
    ${p => p.variant === 'primary' && css`
        background-color: ${p.theme.colors.primary};
        color: ${parseColor(p.color, p.theme) || p.theme.colors.onPrimary};
        border: none;
    `}
    ${p => p.variant === 'secondary' && css`
        background-color: ${p.theme.colors.surface};
        color: ${parseColor(p.color, p.theme) || p.theme.colors.onSurfaceVariant};
        border: none;
    `}
    ${p => p.variant === 'outline' && css`
        background-color: transparent;
        color: ${parseColor(p.color, p.theme) || p.theme.colors.onSurfaceVariant};
        border: 1px solid ${p.theme.colors.outline};
    `}
    border-radius: ${p => p.radius ? parseSize(p.radius, p.theme) : p.theme.dimensions.md};
    font-family: ${p => p.theme.typography.bodyMedium.fontFamily};
    font-size: ${p => p.theme.typography.bodyMedium.fontSize};
    font-weight: ${p => p.theme.typography.bodyMedium.fontWeight};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`