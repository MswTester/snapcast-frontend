import { useTheme } from "@emotion/react";
import AudioBottomSheet from "../components/advanced/AudioBottomSheet";
import { VStack } from "../components/primitives/layout/VStack";
import type { Theme } from "../themes/types";
import { useState, useEffect } from "react";
import SnapItem from "../components/advanced/SnapItem";
import { type SnapItemProps } from "../components/advanced/SnapItem";
import Text from "../components/primitives/Text";
import SearchBar from "../components/advanced/SearchBar";
import { useSearch } from "../../hooks/useSearch";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useAudio } from "../../hooks/useAudio";
import type { Snap } from "../../types";

const Search = () => {
    const theme = useTheme() as Theme;
    const { searchQuery, goBack, handleSnapClick } = useWorkflow();
    const { search, results, isLoading, error } = useSearch();
    const { playSnap } = useAudio();
    const [query, setQuery] = useState(searchQuery || '');
    
    useEffect(() => {
        if (query) {
            search(query);
        }
    }, []);
    
    const handleSearch = () => {
        if (query.trim()) {
            search(query);
        }
    };
    
    const handleSnapItemClick = (snap: Snap) => {
        handleSnapClick(snap);
        playSnap(snap.id);
    };
    
    const convertToSnapItemProps = (snap: Snap): SnapItemProps => ({
        title: snap.title,
        author: `${snap.channel?.name} | ${snap.channel?.author?.name}`,
        tags: snap.tags?.map(tag => ({ focused: false, content: tag.name })) || [],
        onClick: () => handleSnapItemClick(snap)
    });

    return (
        <VStack theme={theme} w="100%" h="100%" bgColor="background">
            <SearchBar 
                placeholder="검색어를 입력해주세요" 
                query={query} 
                onQueryChange={setQuery} 
                onSubmit={handleSearch} 
                onBack={goBack} 
            />
            <VStack theme={theme} w="100%" bgColor="background" p='xl' gap='lg' flex={1} scrollable>
                {isLoading ? (
                    <Text theme={theme} color="onSurfaceVariant">검색 중...</Text>
                ) : error ? (
                    <Text theme={theme} color="error">{error}</Text>
                ) : results.length === 0 ? (
                    <Text theme={theme} color="onSurfaceVariant">검색 결과가 없습니다.</Text>
                ) : (
                    results.map(snap => (
                        <SnapItem key={snap.id} {...convertToSnapItemProps(snap)} />
                    ))
                )}
            </VStack>
            <AudioBottomSheet />
        </VStack>
    );
}

export default Search;