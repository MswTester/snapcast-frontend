import Icon from "../primitives/Icon";
import Text from "../primitives/Text";
import { HStack } from "../primitives/layout/HStack";
import { useTheme } from "@emotion/react";
import type { Theme } from "../../themes/types";

interface ContextItemProps {
    icon: string;
    label: string;
    listening?: boolean;
    onClick: () => void;
}

const ContextItem = ({
    icon,
    label,
    listening,
    onClick
}: ContextItemProps) => {
    const theme = useTheme() as Theme;
    return (
        <HStack theme={theme} gap="lg" onClick={onClick}>
            <Icon isDarkTheme={theme.type === 'dark'} lightSrc={icon} darkSrc={icon} size="20px" />
            <Text theme={theme} variant="titleMedium" color={listening ? "onBackground" : "onSurfaceVariant"}>{label}</Text>
        </HStack>
    )
}

export default ContextItem;
