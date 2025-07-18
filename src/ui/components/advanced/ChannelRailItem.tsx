import { VStack } from "../primitives/layout/VStack";
import type { Theme } from "../../themes/types";
import { useTheme } from "@emotion/react";
import Avatar from "../primitives/Avatar";
import Text from "../primitives/Text";

export interface ChannelRailItemProps {
    avatar: string;
    name: string;
}

const ChannelRailItem = ({ name, avatar }: ChannelRailItemProps) => {
    const theme = useTheme() as Theme;
    return (
        <VStack theme={theme} gap="sm" items="center">
            <Avatar src={avatar} size="48px" />
            <Text theme={theme} variant="bodySmall" color="onBackground">{name}</Text>
        </VStack>
    );
}

export default ChannelRailItem;
