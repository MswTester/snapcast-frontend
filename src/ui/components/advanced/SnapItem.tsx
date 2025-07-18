import { VStack } from "../primitives/layout/VStack";
import type { Theme } from "../../themes/types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { applyTypography } from "../util";
import { HStack } from "../primitives/layout/HStack";

const Chip = styled.div<{ theme: Theme, focused?: boolean }>`
    ${p => applyTypography(p.theme.typography.bodySmall)}
    background-color: ${p => p.theme.colors.background};
    color: ${p => p.focused ? p.theme.colors.primary : p.theme.colors.onSurfaceVariant};
    border-radius: ${p => p.theme.dimensions.xs};
    padding: ${p => p.theme.dimensions.xs} ${p => p.theme.dimensions.sm};
`;

const Title = styled.div`
    ${p => applyTypography(p.theme.typography.titleMedium)}
    color: ${p => p.theme.colors.onBackground};
`;

const Author = styled.div`
    ${p => applyTypography(p.theme.typography.bodySmall)}
    color: ${p => p.theme.colors.onSurfaceVariant};
`;

interface ChipProps {
    focused: boolean;
    content: string;
}

export interface SnapItemProps {
    title: string;
    author: string;
    tags: ChipProps[];
}

const SnapItem = ({ title, author, tags }: SnapItemProps) => {
    const theme = useTheme() as Theme;

    return (
        <VStack theme={theme} w="100%" bgColor="surface" p="lg" gap="sm" r="md">
            <HStack theme={theme} gap="xs">
                {tags.map((tag, index) => (
                    <Chip theme={theme} focused={tag.focused} key={index}>{tag.content}</Chip>
                ))}
            </HStack>
            <Title theme={theme}>{title}</Title>
            <Author theme={theme}>{author}</Author>
        </VStack>
    )
}

export default SnapItem;
