import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { HStack } from "../primitives/layout/HStack";
import { VStack } from "../primitives/layout/VStack";
import type { Theme } from "../../themes/types";
import { applyTypography } from "../util";
import Icon from "../primitives/Icon";

const Title = styled.div`
    ${p => applyTypography(p.theme.typography.titleMedium)}
    color: ${p => p.theme.colors.onBackground};
`;

const Author = styled.div`
    ${p => applyTypography(p.theme.typography.bodySmall)}
    color: ${p => p.theme.colors.onSurfaceVariant};
`;

const PlayButton = styled.button`
    padding: ${p => p.theme.dimensions.sm};
    background-color: ${p => p.theme.colors.primary};
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: ${p => p.theme.colors.primary};
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

interface TrackBarProps {
    title: string;
    author: string;
    onPlay: () => void;
}

const TrackBar = ({ title, author, onPlay }: TrackBarProps) => {
    const theme = useTheme() as Theme;
    
    return (
        <VStack theme={theme}>
            <HStack theme={theme} w="100%" justify="space-between" p="md">
                <VStack theme={theme} gap={"xs"} flex={1}>
                    <Title>{title}</Title>
                    <Author>{author}</Author>
                </VStack>
                <PlayButton onClick={onPlay}>
                    <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_play" darkSrc="ic_play" size="xxxl" />
                </PlayButton>
            </HStack>
        </VStack>
    );
}

export default TrackBar;
