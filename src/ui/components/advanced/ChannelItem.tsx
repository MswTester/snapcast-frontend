import { HStack } from "../primitives/layout/HStack";
import Avatar from "../primitives/Avatar";
import Text from "../primitives/Text";
import { useTheme } from "@emotion/react";
import type { Theme } from "../../themes/types";

interface ChannelItemProps {
    onClick: () => void;
    avatar: string;
    name: string;
    followers: number;
}

const ChannelItem = ({ onClick, avatar, name, followers }: ChannelItemProps) => {
    const theme = useTheme() as Theme;
    return (
        <HStack theme={theme} justify="space-between" gap="lg" onClick={onClick}>
            <HStack theme={theme} gap="lg">
                <Avatar src={avatar} size="20px" />
                <Text theme={theme} variant="titleMedium" color="onBackground">{name}</Text>
            </HStack>
            <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">팔로워 {followers}명</Text>
        </HStack>
    )
}

export default ChannelItem;
