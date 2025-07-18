import { useTheme } from "@emotion/react";
import type { Theme } from "../themes/types";
import { VStack } from "../components/primitives/layout/VStack";
import { Button } from "../components/primitives/Button";
import Text from "../components/primitives/Text";
import Icon from "../components/primitives/Icon";
import { Input } from "../components/primitives/Input";
import { HStack } from "../components/primitives/layout/HStack";
import { useNavigate } from "react-router-dom";
import TrackBar from "../components/advanced/TrackBar";
import { useState } from "react";
import SnapItem, { type SnapItemProps } from "../components/advanced/SnapItem";
import Avatar from "../components/primitives/Avatar";

const Channel = () => {
    const theme = useTheme() as Theme;
    const [snap, setSnap] = useState<SnapItemProps[]>([
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

    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background" justify="start" items="start">
            <HStack theme={theme} w="100%" gap="lg" p={20}>
                <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_back_light" darkSrc="ic_back_dark" size="24px" onClick={() => {}} />
            </HStack>
            <HStack theme={theme} w="100%" gap="lg" p={20} justify="space-between">
                <HStack theme={theme}>
                    <Avatar size="42px" src="" />
                    <VStack theme={theme} gap="xs" ph="lg">
                        <Text theme={theme} variant="titleLarge" color="onBackground">현호세상</Text>
                        <Text theme={theme} variant="bodySmall" color="onSurfaceVariant">팔로워 4명</Text>
                    </VStack>
                </HStack>
                <Button theme={theme} variant="primary" color="primary" onClick={() => {}}>
                    <Text theme={theme} variant="bodyMedium" color="onPrimary">팔로우</Text>
                </Button>
            </HStack>
            <HStack theme={theme} w="100%" gap="md" ph="lg">
                <Button w='100%' theme={theme} variant="secondary" color="primary" onClick={() => {}}>
                    <Text theme={theme} variant="titleSmall" color="primary">스냅 만들기</Text>
                </Button>
                <Button w='100%' theme={theme} variant="secondary" color="primary" onClick={() => {}}>
                    <Text theme={theme} variant="titleSmall" color="onBackground">전체 재생</Text>
                </Button>
            </HStack>
            <VStack theme={theme} w="100%" gap="lg" ph={20} flex={1} scrollable>
                <VStack theme={theme} w="100%" gap="lg" pv="lg">
                    {snap.map((snap, index) => (
                        <SnapItem key={index} {...snap} />
                    ))}
                </VStack>
            </VStack>
            <TrackBar title="와 인생이 끝났어" author="현호세상 | 김현호" progress={0} onClick={() => {}} onPlay={() => {}} />
        </VStack>
    );
}

export default Channel;