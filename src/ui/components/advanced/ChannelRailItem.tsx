import { VStack } from "../primitives/layout/VStack";
import type { Theme } from "../../themes/types";
import { useTheme } from "@emotion/react";
import Avatar from "../primitives/Avatar";
import Text from "../primitives/Text";

export interface ChannelRailItemProps {
    avatar: string;
    name: string;
    onClick?: () => void;
}

const ChannelRailItem = ({ name, avatar, onClick }: ChannelRailItemProps) => {
    const theme = useTheme() as Theme;
    return (
        <VStack theme={theme} gap="sm" items="center" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <Avatar src={avatar} size="48px" />
            <Text theme={theme} variant="bodySmall" color="onBackground">{name}</Text>
        </VStack>
    );
}

export default ChannelRailItem;
