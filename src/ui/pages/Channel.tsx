import { useTheme } from "@emotion/react";
import type { Theme } from "../themes/types";
import { VStack } from "../components/primitives/layout/VStack";
import { Button } from "../components/primitives/Button";
import Text from "../components/primitives/Text";
import Icon from "../components/primitives/Icon";
import { HStack } from "../components/primitives/layout/HStack";
import AudioBottomSheet from "../components/advanced/AudioBottomSheet";
import { useState, useEffect } from "react";
import SnapItem from "../components/advanced/SnapItem";
import Avatar from "../components/primitives/Avatar";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useChannel } from "../../hooks/useChannel";
import { useAudio } from "../../hooks/useAudio";
import { useAuth } from "../../hooks/useAuth";
import { ApiService } from "../../services/api";
import type { Snap } from "../../types";

const Channel = () => {
    const theme = useTheme() as Theme;
    const { selectedChannel, goBack, handleSnapCreation } = useWorkflow();
    const { followChannel, unfollowChannel } = useChannel();
    const { playSnap, addAllToQueue } = useAudio();
    const { user } = useAuth();
    
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (selectedChannel) {
            loadChannelData();
        }
    }, [selectedChannel?.id]);
    
    const loadChannelData = async () => {
        if (!selectedChannel) return;
        
        setIsLoading(true);
        try {
            // Load channel snaps from API
            const response = await ApiService.getRecommendedByChannel(selectedChannel.id);
            setSnaps(response.data || []);
            
            // Check if user is following this channel
            const following = user?.followings?.some(ch => ch.id === selectedChannel.id) || false;
            setIsFollowing(following);
        } catch (error) {
            console.error('Failed to load channel data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFollowToggle = async () => {
        if (!selectedChannel || !user) return;
        
        try {
            if (isFollowing) {
                await unfollowChannel(selectedChannel.id, user.id);
            } else {
                await followChannel(selectedChannel.id, user.id);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    };
    
    const handleAddAllToQueue = () => {
        const snapIds = snaps.map(snap => snap.id);
        addAllToQueue(snapIds);
    };
    
    const handleSnapClick = (snap: Snap) => {
        playSnap(snap.id);
    };
    
    const convertToSnapItemProps = (snap: Snap) => ({
        title: snap.title,
        author: `${snap.channel?.name} | ${snap.channel?.author?.name}`,
        tags: snap.tags?.map(tag => ({ focused: false, content: tag.name })) || [],
        onClick: () => handleSnapClick(snap)
    });
    
    if (!selectedChannel) {
        return (
            <VStack theme={theme} w="100%" h="100%" bgColor="background" justify="center" items="center">
                <Text theme={theme} color="onSurfaceVariant">채널을 선택해주세요</Text>
            </VStack>
        );
    }
    
    const isMyChannel = user?.myChannel?.id === selectedChannel.id;

    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background" justify="start" items="start">
            <HStack theme={theme} w="100%" gap="lg" p={20}>
                <div onClick={goBack} style={{ cursor: 'pointer' }}>
                    <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_back_light" darkSrc="ic_back_dark" size="24px" />
                </div>
            </HStack>
            
            <HStack theme={theme} w="100%" gap="lg" p={20} justify="space-between">
                <HStack theme={theme}>
                    <Avatar size="42px" src={selectedChannel.avatar || '/avatar.png'} />
                    <VStack theme={theme} gap="xs" ph="lg">
                        <Text theme={theme} variant="titleLarge" color="onBackground">
                            {selectedChannel.name}
                        </Text>
                        <Text theme={theme} variant="bodySmall" color="onSurfaceVariant">
                            팔로워 {selectedChannel.followers?.length || 0}명
                        </Text>
                    </VStack>
                </HStack>
                
                {!isMyChannel && (
                    <Button 
                        theme={theme} 
                        variant={isFollowing ? "outline" : "primary"} 
                        color="primary" 
                        onClick={handleFollowToggle}
                    >
                        <Text theme={theme} variant="bodyMedium" color={isFollowing ? "primary" : "onPrimary"}>
                            {isFollowing ? "팔로잉" : "팔로우"}
                        </Text>
                    </Button>
                )}
            </HStack>
            
            <HStack theme={theme} w="100%" gap="md" ph="lg">
                {isMyChannel && (
                    <Button 
                        w='100%' 
                        theme={theme} 
                        variant="secondary" 
                        color="primary" 
                        onClick={handleSnapCreation}
                    >
                        <Text theme={theme} variant="titleSmall" color="primary">스냅 만들기</Text>
                    </Button>
                )}
                
                <Button 
                    w='100%' 
                    theme={theme} 
                    variant="secondary" 
                    color="primary" 
                    onClick={handleAddAllToQueue}
                    disabled={snaps.length === 0}
                >
                    <Text theme={theme} variant="titleSmall" color="onBackground">전체 재생</Text>
                </Button>
            </HStack>
            
            <VStack theme={theme} w="100%" gap="lg" ph={20} flex={1} scrollable>
                <VStack theme={theme} w="100%" gap="lg" pv="lg">
                    {isLoading ? (
                        <Text theme={theme} color="onSurfaceVariant">로딩 중...</Text>
                    ) : snaps.length === 0 ? (
                        <Text theme={theme} color="onSurfaceVariant">아직 스냅이 없습니다</Text>
                    ) : (
                        snaps.map(snap => (
                            <SnapItem key={snap.id} {...convertToSnapItemProps(snap)} />
                        ))
                    )}
                </VStack>
            </VStack>
            
            <AudioBottomSheet />
        </VStack>
    );
};

export default Channel;