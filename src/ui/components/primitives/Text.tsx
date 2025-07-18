import styled from "@emotion/styled";
import type { Theme, Typography } from "../../themes";
import { applyTypography } from "../util";
import { parseColor } from "../../utils";

interface TextProps {
    variant?: keyof Typography;
    color?: string;
    center?: boolean;
}

const Text = styled.span<TextProps & { theme: Theme }>`
    color: ${p => p.color ? parseColor(p.color, p.theme) : p.theme.colors.onSurface};
    ${p => applyTypography(p.theme.typography[p.variant || 'bodyLarge'])}
    ${p => p.center && 'text-align: center;'}
`;

export default Text;