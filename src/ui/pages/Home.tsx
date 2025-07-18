import { useTheme } from "@emotion/react";
import TrackBar from "../components/advanced/TrackBar";
import { VStack } from "../components/primitives/layout/VStack";
import type { Theme } from "../themes/types";
import { HStack } from "../components/primitives/layout/HStack";
import Icon from "../components/primitives/Icon";
import { useState } from "react";
import SnapItem from "../components/advanced/SnapItem";

const Home = () => {
    const theme = useTheme() as Theme;
    const [avatar, setAvatar] = useState('/avatar.png');
    
    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background">
            <HStack theme={theme} w="100%" justify="space-between" items="center" ph="xl" pv="lg">
                <img 
                    src={'logo.svg'}
                    alt="icon" 
                    width={'118px'} 
                    height={'22px'}
                />
                <HStack theme={theme} gap="lg">
                    <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_search_ob_light" darkSrc="ic_search_ob_dark" size="24px" />
                    <img 
                        style={{ borderRadius: '50%' }}
                        src={avatar}
                        alt="avatar" 
                        width={'24px'} 
                        height={'24px'}
                    />
                </HStack>
            </HStack>
            <VStack theme={theme} w="100%" h="100%" gap="lg" ph={20}>
                <SnapItem
                    title="사랑을 위해 17대 1을 한다."
                    author="현호세상 | 김현호"
                    tags={[
                        { focused: true, content: "연애" },
                        { focused: false, content: "현피" },
                    ]}
                />
            </VStack>
            <TrackBar title="사랑을 위해 17대 1을 한다" author="현호세상" progress={50} onClick={() => {}} onPlay={() => {}} />
        </VStack>
    );
}

export default Home;