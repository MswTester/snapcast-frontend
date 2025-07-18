import { HStack } from "../primitives/layout/HStack";
import { useTheme } from "@emotion/react";
import type { Theme } from "../../themes/types";
import Icon from "../primitives/Icon";
import { Input } from "../primitives/Input";
import styled from "@emotion/styled";

const WrapButton = styled.button`
    padding: ${p => p.theme.dimensions.none};
    background-color: ${p => p.theme.colors.background};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
`;

interface SearchBarProps {
    query: string;
    placeholder: string;
    onQueryChange: (query: string) => void;
    onSubmit: () => void;
    onBack: () => void;
}

const SearchBar = ({ query, placeholder, onQueryChange, onSubmit, onBack }: SearchBarProps) => {
    const theme = useTheme() as Theme;
    return (
        <HStack theme={theme} w='100%' p='xl' gap='md'>
            <WrapButton onClick={onBack}>
                <Icon isDarkTheme={theme.type === 'dark'} lightSrc="ic_back_light" darkSrc="ic_back_dark" size="24px" />
            </WrapButton>
            <Input placeholder={placeholder} w='100%' theme={theme} value={query} onChange={(e) => onQueryChange(e.target.value)} />
        </HStack>
    );
}

export default SearchBar;
