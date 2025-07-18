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
import SearchBar from "../components/advanced/SearchBar";

const Search = () => {
    const theme = useTheme() as Theme;
    const [query, setQuery] = useState('');
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
        <VStack theme={theme} w="100%" h="100%" bgColor="background">
            <SearchBar placeholder="검색어를 입력해주세요" query={query} onQueryChange={(query) => setQuery(query)} onSubmit={() => { }} onBack={() => { }} />
            <VStack theme={theme} w="100%" bgColor="background" p='xl' gap='lg' flex={1} scrollable>
                {snap.map((snap, index) => (
                    <SnapItem key={index} {...snap} />
                ))}
            </VStack>
            <TrackBar title="선린톤 1등 후보인 건에 대해" author="문선우" onClick={() => { }} onPlay={() => { }} progress={50} />
        </VStack>
    );
}

export default Search;