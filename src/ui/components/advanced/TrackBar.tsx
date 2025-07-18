import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { HStack } from "../primitives/layout/HStack";
import { VStack } from "../primitives/layout/VStack";
import type { Theme } from "../../themes/types";
import { applyTypography } from "../util";

const Title = styled.div`
    ${p => applyTypography(p.theme.typography.titleMedium)}
    color: ${p => p.theme.colors.onBackground};
`;

const Author = styled.div`
    ${p => applyTypography(p.theme.typography.bodySmall)}
    color: ${p => p.theme.colors.onSurfaceVariant};
`;

interface TrackBarProps {
    title: string;
    author: string;
    onPlay: () => void;
}

const TrackBar = ({ title, author, onPlay }: TrackBarProps) => {
    const theme = useTheme() as Theme;
    
    return (
        <HStack theme={theme}>
            <VStack theme={theme}>
                <Title>{title}</Title>
                <Author>{author}</Author>
            </VStack>
        </HStack>
    );
}

export default TrackBar;
