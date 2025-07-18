import { useTheme } from "@emotion/react";
import type { Theme } from "../themes/types";
import { VStack } from "../components/primitives/layout/VStack";
import { Button } from "../components/primitives/Button";
import Text from "../components/primitives/Text";
import Icon from "../components/primitives/Icon";
import { Input } from "../components/primitives/Input";

const CreateSnap = () => {
    const theme = useTheme() as Theme;

    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background" justify="space-between" items="center" pv="lg" ph="xl">
            <VStack theme={theme} gap="lg" pv="xl" ph="lg" items="start">
                <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_back_light" darkSrc="ic_back_dark" size="24px" onClick={() => {}} />
                <Text theme={theme} variant="bodyMedium" color="onSurfaceVariant">1/10</Text>
                <Text theme={theme} variant="headlineSmall" color="onBackground">무슨 사연이 있으신가요?</Text>
                <Input theme={theme} w="100%" h="48px" placeholder="당신의 이야기를 들려주세요" />
            </VStack>
            <Button theme={theme} w="100%" radius="md" pv="lg" variant="primary">
                <Text theme={theme} variant="titleMedium" color="onPrimary">다음</Text>
            </Button>
        </VStack>
    );
}

export default CreateSnap;