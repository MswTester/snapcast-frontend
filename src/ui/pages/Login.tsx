import { useTheme } from "@emotion/react";
import type { Theme } from "../themes/types";
import { VStack } from "../components/primitives/layout/VStack";
import { Button } from "../components/primitives/Button";
import Text from "../components/primitives/Text";
import Icon from "../components/primitives/Icon";
import { Input } from "../components/primitives/Input";
import { HStack } from "../components/primitives/layout/HStack";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useWorkflow } from "../../hooks/useWorkflow";

const Login = () => {
    const theme = useTheme() as Theme;
    const { login, isLoading, error } = useAuth();
    const { navigateToHome, handleRegisterFlow, goBack } = useWorkflow();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async () => {
        if (!email || !password) return;
        
        try {
            await login({ email, password });
            navigateToHome();
        } catch (err) {
            console.error('Login failed:', err);
        }
    };
    
    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background" justify="space-between" items="center" pv="lg" ph="xl">
            <VStack theme={theme} gap="lg" pv="xl" ph="lg" items="start">
                <div onClick={goBack} style={{ cursor: 'pointer' }}>
                    <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_back_light" darkSrc="ic_back_dark" size="24px" />
                </div>
                <Text theme={theme} variant="headlineSmall" color="onBackground">로그인 해주세요</Text>
                <Input 
                    theme={theme} 
                    w="100%" 
                    h="48px" 
                    placeholder="이메일을 입력해주세요" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                <Input 
                    theme={theme} 
                    w="100%" 
                    h="48px" 
                    placeholder="비밀번호를 입력해주세요" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                {error && (
                    <Text theme={theme} variant="bodySmall" color="error">
                        {error}
                    </Text>
                )}
                <HStack theme={theme} pv="lg" gap="sm">
                    <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">계정이 없으신가요?</Text>
                    <Text theme={theme} variant="bodyMedium" color="primary" onClick={handleRegisterFlow} style={{ cursor: 'pointer' }}>회원가입</Text>
                </HStack>
            </VStack>
            <Button 
                theme={theme} 
                w="100%" 
                radius="md" 
                pv="lg" 
                variant="primary"
                onClick={handleSubmit}
                disabled={!email || !password || isLoading}
            >
                <Text theme={theme} variant="titleMedium" color="onPrimary">
                    {isLoading ? "로그인 중..." : "로그인"}
                </Text>
            </Button>
        </VStack>
    );
}

export default Login;