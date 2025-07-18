import styled from "@emotion/styled";
import type { Theme } from "../../themes/types";

export const Button = styled.button<{ theme: Theme }>`
    display: inline-block;
    padding: ${p => p.theme.dimensions.sm} ${p => p.theme.dimensions.md};
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.onPrimary};
    border: none;
    border-radius: ${p => p.theme.dimensions.sm};
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