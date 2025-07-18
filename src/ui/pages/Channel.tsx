import { useTheme } from "@emotion/react";
import { VStack } from "../components/primitives/layout/VStack";
import { HStack } from "../components/primitives/layout/HStack";
import type { Theme } from "../themes/types";
import Text from "../components/primitives/Text";
import { Button } from "../components/primitives/Button";
import Icon from "../components/primitives/Icon";
import SnapItem from "../components/advanced/SnapItem";
import AudioBottomSheet from "../components/advanced/AudioBottomSheet";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useChannel } from "../../hooks/useChannel";
import { useAudio } from "../../hooks/useAudio";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import type { Snap } from "../../types";
import styled from "@emotion/styled";
import { ApiService } from "../../services/api";

const ChannelAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileCard = styled.div<{ theme: Theme }>`
    background-color: ${p => p.theme.colors.surface};
    border-radius: ${p => p.theme.dimensions.lg};
    padding: ${p => p.theme.dimensions.xl};
    margin: ${p => p.theme.dimensions.xl};
`;

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
        if (!selectedChannel) return;
        
        try {
            if (isFollowing) {
                await unfollowChannel(selectedChannel.id);
            } else {
                await followChannel(selectedChannel.id);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    };
    
    const handleAddAllToQueue = () => {
        snaps.forEach(snap => {
            addAllToQueue([snap.id]);
        });
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
        <VStack theme={theme} w="100%" h="100%" bgColor="background">
            {/* Header */}
            <HStack theme={theme} p="lg" items="center">
                <div onClick={goBack} style={{ cursor: 'pointer' }}>
                    <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_back_light" darkSrc="ic_back_dark" size="24px" />
                </div>
            </HStack>
            
            {/* Profile Card */}
            <ProfileCard theme={theme}>
                <VStack theme={theme} gap="lg" items="center">
                    <ChannelAvatar src={selectedChannel.avatar || '/avatar.png'} alt={selectedChannel.name} />
                    <Text theme={theme} variant="headlineMedium" color="onSurface">
                        {selectedChannel.name}
                    </Text>
                    <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">
                        팔로워 {selectedChannel.followers?.length || 0}명
                    </Text>
                    
                    {!isMyChannel && (
                        <Button
                            theme={theme}
                            variant={isFollowing ? "outline" : "primary"}
                            color="primary"
                            w="100%"
                            pv="md"
                            onClick={handleFollowToggle}
                        >
                            <Text theme={theme} color={isFollowing ? "primary" : "onPrimary"}>
                                {isFollowing ? "팔로잉 중" : "팔로우"}
                            </Text>
                        </Button>
                    )}
                </VStack>
            </ProfileCard>
            
            {/* Action Buttons */}
            <HStack theme={theme} ph="xl" gap="md">
                {isMyChannel && (
                    <Button
                        theme={theme}
                        variant="primary"
                        color="primary"
                        flex={1}
                        pv="md"
                        onClick={handleSnapCreation}
                    >
                        <Text theme={theme} color="onPrimary">스냅 만들기</Text>
                    </Button>
                )}
                
                <Button
                    theme={theme}
                    variant="outline"
                    color="primary"
                    flex={1}
                    pv="md"
                    onClick={handleAddAllToQueue}
                    disabled={snaps.length === 0}
                >
                    <Text theme={theme} color="primary">모두 재생목록에 추가</Text>
                </Button>
            </HStack>
            
            {/* Channel Snaps */}
            <VStack theme={theme} flex={1} p="xl" gap="lg" scrollable>
                <Text theme={theme} variant="titleLarge" color="onBackground">
                    채널 스냅
                </Text>
                
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
            
            <AudioBottomSheet />
        </VStack>
    );
};

export default Channel;