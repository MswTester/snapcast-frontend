import { VStack } from "../components/primitives/layout/VStack";
import { useTheme } from "@emotion/react";
import type { Theme } from "../themes/types";
import { Button } from "../components/primitives/Button";
import { useNavigate } from "react-router-dom";
import Text from "../components/primitives/Text";

const NotFound = () => {
    const theme = useTheme() as Theme;
    const navigate = useNavigate();
    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background" justify="center" items="center" gap="48px">
            <img src="logo.svg" alt="logo" width="177px" height="32px" />
            <VStack theme={theme} gap="lg" items="center">
                <Text theme={theme} variant="displayLarge" color="onBackground">404</Text>
                <Text theme={theme} variant="bodyMedium" color="onBackground">페이지를 찾을 수 없습니다.</Text>
            </VStack>
            <Button theme={theme} variant="outline" w="130px" onClick={() => navigate('/')} pv="xl" ph="lg">
                <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">홈으로 이동</Text>
            </Button>
        </VStack>
    );
}

export default NotFound;