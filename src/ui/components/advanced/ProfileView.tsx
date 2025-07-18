import type { Theme } from "@emotion/react";
import { VStack } from "../primitives/layout/VStack";
import { useTheme } from "@emotion/react";
import { HStack } from "../primitives/layout/HStack";
import { useAuth } from "../../../hooks/useAuth";
import Avatar from "../primitives/Avatar";
import Text from "../primitives/Text";
import { Button } from "../primitives/Button";
import ChannelItem from "./ChannelItem";
import ControllBar from "./ControllBar";

interface ProfileViewProps {
    onClickChannel: (channelId: number) => void;
    onClickCreateChannel: () => void;
    onClickLogout: () => void;
}

const ProfileView = ({onClickChannel, onClickCreateChannel, onClickLogout}: ProfileViewProps) => {
    const {user} = useAuth();
    const theme = useTheme() as Theme;
    
    return (
        <VStack theme={theme}>
            <ControllBar />
            <HStack theme={theme} pt="md" pb="md" pr="xl" pl="xl" justify="space-between">
                <HStack theme={theme} gap="lg">
                    <Avatar src={user?.avatar || ""} size="42px" />
                    <VStack theme={theme} gap="xs">
                        <Text theme={theme} variant="headlineSmall" color="onBackground">{user?.name}</Text>
                        <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">{user?.email}</Text>
                    </VStack>
                </HStack>
                <Button theme={theme} variant="outline" color="error" onClick={onClickLogout}>로그아웃</Button>
            </HStack>
            <VStack theme={theme} gap="lg" pt="lg" pb="lg" pr="xl" pl="xl">
                <HStack theme={theme} gap="sm">
                    <Text theme={theme} variant="bodySmall" color="onBackground">팔로우</Text>
                    <Text theme={theme} variant="bodySmall" color="onSurfaceVariant">{user?.followings?.length || 0}</Text>
                </HStack>
                <VStack theme={theme} gap="xl" maxh="30vh" scrollable>
                    {user?.followings?.map((channel) => (
                        <ChannelItem key={channel.id} onClick={() => onClickChannel(channel.id)} avatar={channel.avatar} name={channel.name} followers={channel.followers?.length || 0} />
                    ))}
                </VStack>
            </VStack>
            <Button theme={theme} pv="lg" mh="xl" mv="xl" w="100%" variant="primary" onClick={user?.myChannel?.id ? () => onClickChannel((user.myChannel as any).id) : onClickCreateChannel}>
                <Text theme={theme} variant="titleMedium" color="onPrimary">${user?.myChannel?.id ? "내 채널" : "채널 만들기"}</Text>
            </Button>
        </VStack>
    );
}

export default ProfileView;