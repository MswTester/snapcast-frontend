import { useTheme } from "@emotion/react";
import AudioBottomSheet from "../components/advanced/AudioBottomSheet";
import ProfileView from "../components/advanced/ProfileView";
import { VStack } from "../components/primitives/layout/VStack";
import type { Theme } from "../themes/types";
import { HStack } from "../components/primitives/layout/HStack";
import Icon from "../components/primitives/Icon";
import { useState, useEffect } from "react";
import SnapItem from "../components/advanced/SnapItem";
import ChannelRailItem, { type ChannelRailItemProps } from "../components/advanced/ChannelRailItem";
import { type SnapItemProps } from "../components/advanced/SnapItem";
import Text from "../components/primitives/Text";
import { useAuth } from "../../hooks/useAuth";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useAudio } from "../../hooks/useAudio";
import { ApiService } from "../../services/api";
import type { Snap, Channel } from "../../types";
import styled from "@emotion/styled";
import { applyTypography } from "../components/util";

const SmallButton = styled.button<{ theme: Theme }>`
    ${p => applyTypography(p.theme.typography.titleSmall)}
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.onPrimary};
    border-radius: ${p => p.theme.dimensions.sm};
    padding: ${p => p.theme.dimensions.sm} ${p => p.theme.dimensions.md};
    border: none;
`;

const Home = () => {
    const theme = useTheme() as Theme;
    const { user } = useAuth();
    const { toggleSearchModal, handleProfileClick, closeProfileOverlay, isProfileOverlayOpen, handleChannelClick, handleSnapClick } = useWorkflow();
    const { playSnap } = useAudio();
    
    const [recommendChannels, setRecommendChannels] = useState<Channel[]>([]);
    const [hotSnaps, setHotSnaps] = useState<Snap[]>([]);
    const [trendingSnaps, setTrendingSnaps] = useState<Snap[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // Load data on component mount
    useEffect(() => {
        const loadHomeData = async () => {
            setIsLoading(true);
            try {
                const [popularResponse, trendingResponse] = await Promise.all([
                    ApiService.getPopularSnaps(),
                    ApiService.getTrendingSnaps()
                ]);
                
                setHotSnaps(popularResponse.data || []);
                setTrendingSnaps(trendingResponse.data || []);
                // TODO: Load recommended channels from appropriate API
                setRecommendChannels([]);
            } catch (error) {
                console.error('Failed to load home data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadHomeData();
    }, []);
    // Handle snap click
    const onSnapClick = (snap: Snap) => {
        handleSnapClick(snap);
        playSnap(snap.id);
    };
    
    // Handle channel click
    const onChannelClick = (channel: Channel) => {
        handleChannelClick(channel);
    };
    
    // Convert Snap to SnapItemProps
    const convertToSnapItemProps = (snap: Snap): SnapItemProps => ({
        title: snap.title,
        author: `${snap.channel?.name} | ${snap.channel?.author?.name}`,
        tags: snap.tags?.map(tag => ({ focused: false, content: tag.name })) || [],
        onClick: () => onSnapClick(snap)
    });
    
    // Convert Channel to ChannelRailItemProps
    const convertToChannelRailProps = (channel: Channel): ChannelRailItemProps => ({
        avatar: channel.avatar || '/avatar.png',
        name: channel.name,
        onClick: () => onChannelClick(channel)
    });
    
    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background">
            <HStack theme={theme} w="100%" justify="space-between" items="center" ph="xl" pv="lg">
                <img 
                    src={'logo.svg'}
                    alt="icon" 
                    width={'118px'} 
                    height={'22px'}
                />
                <HStack theme={theme} gap="lg" items="center">
                    <div onClick={toggleSearchModal} style={{ cursor: 'pointer' }}>
                        <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_search_ob_light" darkSrc="ic_search_ob_dark" size="24px" />
                    </div>
                    {user ? (
                        <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                            <img 
                                style={{ borderRadius: '50%' }}
                                src={user?.avatar || '/avatar.png'}
                                alt="avatar" 
                                width={'24px'} 
                                height={'24px'}
                            />
                        </div>
                    ) : (
                        <SmallButton theme={theme} onClick={handleProfileClick}>로그인</SmallButton>
                    )}
                </HStack>
            </HStack>
            <VStack theme={theme} w="100%" gap="lg" ph={20} flex={1} scrollable>
                <VStack theme={theme} w="100%" gap="lg" pv="lg">
                    <Text theme={theme} variant="titleLarge" color="onBackground">HOT한 스냅</Text>
                    {isLoading ? (
                        <Text theme={theme} color="onSurfaceVariant">로딩 중...</Text>
                    ) : (
                        hotSnaps.map((snap) => (
                            <SnapItem key={snap.id} {...convertToSnapItemProps(snap)} />
                        ))
                    )}
                </VStack>
                <VStack theme={theme} w="100%" gap="lg" pv="lg">
                    <Text theme={theme} variant="titleLarge" color="onBackground">추천 채널</Text>
                    <div style={{ 
                        width: '100%',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        WebkitOverflowScrolling: 'touch',
                        paddingBottom: '8px', // Add some space for scrollbar if it appears
                    }}>
                        <HStack 
                            theme={theme} 
                            gap="xl" 
                            style={{
                                width: 'max-content',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                            }}
                        >
                            {isLoading ? (
                                <Text theme={theme} color="onSurfaceVariant">로딩 중...</Text>
                            ) : (
                                recommendChannels.map((channel) => (
                                    <ChannelRailItem key={channel.id} {...convertToChannelRailProps(channel)} />
                                ))
                            )}
                        </HStack>
                    </div>
                </VStack>
                <VStack theme={theme} w="100%" gap="lg" pv="lg">
                    <Text theme={theme} variant="titleLarge" color="onBackground">현재 유행하는 스냅</Text>
                    {isLoading ? (
                        <Text theme={theme} color="onSurfaceVariant">로딩 중...</Text>
                    ) : (
                        trendingSnaps.map((snap) => (
                            <SnapItem key={snap.id} {...convertToSnapItemProps(snap)} />
                        ))
                    )}
                </VStack>
            </VStack>
            <AudioBottomSheet />
            <ProfileView isOpen={isProfileOverlayOpen} onClose={closeProfileOverlay} />
        </VStack>
    );
}

export default Home;