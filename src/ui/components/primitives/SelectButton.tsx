import styled from "@emotion/styled";
import type { Theme } from "../../themes/types";
import { parseSize } from "../../utils";
import type { Size } from "../../types";
import { css } from "@emotion/react";

export interface SelectButtonProps {
    selected?: boolean;
    w?: Size;
    h?: Size;
}

export const SelectButton = styled.button<SelectButtonProps & { theme: Theme }>`
    display: inline-block;
    width: ${p => p.w ? parseSize(p.w, p.theme) : 'auto'};
    height: ${p => p.h ? parseSize(p.h, p.theme) : 'auto'};
    padding: ${p => p.theme.dimensions.lg};
    background-color: transparent;
    color: ${p => p.theme.colors.onBackground};
    border: 1px solid ${p => p.theme.colors.outline};
    border-radius: ${p => p.theme.dimensions.md};
    font-family: ${p => p.theme.typography.titleLarge.fontFamily};
    font-size: ${p => p.theme.typography.titleLarge.fontSize};
    font-weight: ${p => p.theme.typography.titleLarge.fontWeight};
    transition: all 0.2s ease;

    ${p => p.selected && css`
        background-color: ${p.theme.colors.primary};
        color: ${p.theme.colors.onPrimary};
        border: none;
    `}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`