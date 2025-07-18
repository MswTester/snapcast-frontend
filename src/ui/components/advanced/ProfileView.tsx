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
import { useWorkflow } from "../../../hooks/useWorkflow";
import { useCallback } from "react";

interface ProfileViewProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileView = ({ isOpen, onClose }: ProfileViewProps) => {
    const { user, logout } = useAuth();
    const theme = useTheme() as Theme;
    const { handleMyChannelClick, handleChannelClick, navigateToHome } = useWorkflow();
    
    const handleLogout = useCallback(async () => {
        await logout();
        onClose();
        navigateToHome();
    }, [logout, onClose, navigateToHome]);
    
    const handleDrag = useCallback(() => {}, []);
    const handleDragEnd = useCallback((velocity: number, deltaY: number) => {
        if (deltaY > 100 || velocity > 0.5) {
            onClose();
        }
    }, [onClose]);
    const handleTap = useCallback(() => {}, []);
    
    if (!user || !isOpen) return null;
    
    return (
        <VStack theme={theme}>
            <ControllBar 
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onTap={handleTap}
                isExpanded={false}
            />
            <HStack theme={theme} pt="md" pb="md" pr="xl" pl="xl" justify="space-between">
                <HStack theme={theme} gap="lg">
                    <Avatar src={user?.avatar || ""} size="42px" />
                    <VStack theme={theme} gap="xs">
                        <Text theme={theme} variant="headlineSmall" color="onBackground">{user?.name}</Text>
                        <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">{user?.email}</Text>
                    </VStack>
                </HStack>
                <Button theme={theme} variant="outline" color="error" onClick={handleLogout}>로그아웃</Button>
            </HStack>
            <VStack theme={theme} gap="lg" pt="lg" pb="lg" pr="xl" pl="xl">
                <HStack theme={theme} gap="sm">
                    <Text theme={theme} variant="bodySmall" color="onBackground">팔로우</Text>
                    <Text theme={theme} variant="bodySmall" color="onSurfaceVariant">{user?.followings?.length || 0}</Text>
                </HStack>
                <VStack theme={theme} gap="xl" maxh="30vh" scrollable>
                    {user?.followings?.map((channel) => (
                        <ChannelItem 
                            key={channel.id} 
                            onClick={() => {
                                handleChannelClick(channel);
                                onClose();
                            }} 
                            avatar={channel.avatar} 
                            name={channel.name} 
                            followers={channel.followers?.length || 0} 
                        />
                    ))}
                </VStack>
            </VStack>
            <Button 
                theme={theme} 
                pv="lg" 
                mh="xl" 
                mv="xl" 
                w="100%" 
                variant="primary" 
                onClick={() => {
                    handleMyChannelClick();
                    onClose();
                }}
            >
                <Text theme={theme} variant="titleMedium" color="onPrimary">
                    {user?.myChannel ? "내 채널" : "채널 만들기"}
                </Text>
            </Button>
        </VStack>
    );
}

export default ProfileView;