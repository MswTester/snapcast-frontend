import { useTheme } from "@emotion/react";
import TrackBar from "../components/advanced/TrackBar";
import { VStack } from "../components/primitives/layout/VStack";
import type { Theme } from "../themes/types";
import { HStack } from "../components/primitives/layout/HStack";
import Icon from "../components/primitives/Icon";
import { useState } from "react";
import SnapItem from "../components/advanced/SnapItem";
import ChannelRailItem, { type ChannelRailItemProps } from "../components/advanced/ChannelRailItem";
import { type SnapItemProps } from "../components/advanced/SnapItem";
import Text from "../components/primitives/Text";
import { useAuth } from "../../hooks/useAuth";
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
    const [recommendChannel, setRecommendChannel] = useState<ChannelRailItemProps[]>([
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
        {
            avatar: '/avatar.png',
            name: '현호세상'
        },
    ]);
    const [hotSnap, setHotSnap] = useState<SnapItemProps[]>([
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
    ]);
    const [trendingSnap, setTrendingSnap] = useState<SnapItemProps[]>([
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
        {
            title: '사랑을 위해 17대 1을 한다.',
            author: '현호세상 | 김현호',
            tags: [
                { focused: true, content: "연애" },
                { focused: false, content: "현피" },
            ]
        },
    ]);
    
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
                    <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_search_ob_light" darkSrc="ic_search_ob_dark" size="24px" />
                    {user ? (
                        <img 
                            style={{ borderRadius: '50%' }}
                            src={user?.avatar}
                            alt="avatar" 
                            width={'24px'} 
                            height={'24px'}
                        />
                    ) : (
                        <SmallButton theme={theme} onClick={() => {}}>로그인</SmallButton>
                    )}
                </HStack>
            </HStack>
            <VStack theme={theme} w="100%" gap="lg" ph={20} flex={1} scrollable>
                <VStack theme={theme} w="100%" gap="lg" pv="lg">
                    <Text theme={theme} variant="titleLarge" color="onBackground">HOT한 스냅</Text>
                    {hotSnap.map((snap, index) => (
                        <SnapItem key={index} {...snap} />
                    ))}
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
                            {recommendChannel.map((channel, index) => (
                                <ChannelRailItem key={index} {...channel} />
                            ))}
                        </HStack>
                    </div>
                </VStack>
                <VStack theme={theme} w="100%" gap="lg" pv="lg">
                    <Text theme={theme} variant="titleLarge" color="onBackground">현재 유행하는 스냅</Text>
                    {trendingSnap.map((snap, index) => (
                        <SnapItem key={index} {...snap} />
                    ))}
                </VStack>
            </VStack>
            <TrackBar title="사랑을 위해 17대 1을 한다" author="현호세상" progress={50} onClick={() => {}} onPlay={() => {}} />
        </VStack>
    );
}

export default Home;