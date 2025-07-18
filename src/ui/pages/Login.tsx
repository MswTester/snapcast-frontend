import { useTheme } from "@emotion/react";
import type { Theme } from "../themes/types";
import { VStack } from "../components/primitives/layout/VStack";
import { Button } from "../components/primitives/Button";
import Text from "../components/primitives/Text";
import Icon from "../components/primitives/Icon";
import { Input } from "../components/primitives/Input";
import { HStack } from "../components/primitives/layout/HStack";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const theme = useTheme() as Theme;
    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background" justify="space-between" items="center" pv="lg" ph="xl">
            <VStack theme={theme} gap="lg" pv="xl" ph="lg" items="start">
                <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_back_light" darkSrc="ic_back_dark" size="24px" onClick={() => navigate('/')} />
                <Text theme={theme} variant="headlineSmall" color="onBackground">로그인 해주세요</Text>
                <Input theme={theme} w="100%" h="48px" placeholder="이메일을 입력해주세요" />
                <Input theme={theme} w="100%" h="48px" placeholder="비밀번호를 입력해주세요" />
                <HStack theme={theme} pv="lg" gap="sm">
                    <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">계정이 없으신가요?</Text>
                    <Text theme={theme} variant="bodyMedium" color="primary" onClick={() => navigate('/register')}>회원가입</Text>
                </HStack>
            </VStack>
            <Button theme={theme} w="100%" radius="md" pv="lg" variant="primary">
                <Text theme={theme} variant="titleMedium" color="onPrimary">로그인</Text>
            </Button>
        </VStack>
    );
}

export default Login;