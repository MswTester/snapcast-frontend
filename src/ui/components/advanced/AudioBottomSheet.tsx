import { VStack } from "../primitives/layout/VStack";
import { HStack } from "../primitives/layout/HStack";
import { useTheme } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import type { Theme } from "../../themes/types";
import Text from "../primitives/Text";
import {Button} from "../primitives/Button";
import ControllBar from "./ControllBar";
import Icon from "../primitives/Icon";
import { useAudio, useWorkflow } from "../../../hooks";
import { ApiService } from "../../../services/api";
import type { Context, Snap } from "../../../types";

interface ProgressBarProps {
    progress: number;
    onSeek?: (progress: number) => void;
}

const ProgressBar = ({progress, onSeek}: ProgressBarProps) => {
    const theme = useTheme() as Theme;
    
    const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!onSeek) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newProgress = (clickX / rect.width) * 100;
        onSeek(Math.max(0, Math.min(100, newProgress)));
    }, [onSeek]);

    return (
        <HStack 
            theme={theme} 
            relative 
            w="100%" 
            r="999px" 
            h="6px" 
            bgColor="outline"
            onClick={handleProgressClick}
        >
            <HStack theme={theme} absolute w={`${progress}%`} h="6px" r="50%" bgColor="primary" />
            <HStack 
                theme={theme} 
                absolute 
                l={`${progress}%`} 
                w="14px" 
                h="14px" 
                r="50%" 
                bgColor="primary"
            />
        </HStack>
    )
}

const AudioBottomSheet = () => {
    const theme = useTheme() as Theme;
    const {
        currentSnap,
        currentTime,
        duration,
        isPlaying,
        togglePlayPause,
        playNext,
        playPrevious,
        queue,
        addToQueue,
        autoPlayEnabled,
        setAutoPlayEnabled,
    } = useAudio();
    
    const { toggleAudioTrackbar, isAudioTrackbarOpen } = useWorkflow();
    
    const [contexts, setContexts] = useState<Context[]>([]);
    const [isLoadingQueue, setIsLoadingQueue] = useState(false);
    const [_fullSnapData, setFullSnapData] = useState<Snap | null>(null);

    // Calculate progress percentage
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Fetch full snap data including contexts
    useEffect(() => {
        const fetchSnapData = async () => {
            if (currentSnap?.id) {
                try {
                    const response = await ApiService.getSnapInfo(currentSnap.id);
                    setFullSnapData(response.data);
                    if (response.data.contexts) {
                        setContexts(response.data.contexts);
                    }
                } catch (error) {
                    console.error('Failed to fetch snap data:', error);
                }
            }
        };

        fetchSnapData();
    }, [currentSnap?.id]);

    // Auto-add popular snaps to queue when queue is getting low
    const autoAddToQueue = useCallback(async () => {
        if (!autoPlayEnabled || isLoadingQueue || queue.length > 2) return;
        
        setIsLoadingQueue(true);
        try {
            const response = await ApiService.getPopularSnaps();
            const popularSnaps = response.data;
            
            // Add 3 random popular snaps to queue
            const randomSnaps = popularSnaps
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .filter(snap => !queue.includes(snap.id));
            
            randomSnaps.forEach(snap => {
                addToQueue(snap.id);
            });
        } catch (error) {
            console.error('Failed to auto-add to queue:', error);
        } finally {
            setIsLoadingQueue(false);
        }
    }, [autoPlayEnabled, isLoadingQueue, queue, addToQueue]);

    // Monitor queue and auto-add when needed
    useEffect(() => {
        if (queue.length <= 1 && autoPlayEnabled) {
            autoAddToQueue();
        }
    }, [queue.length, autoAddToQueue, autoPlayEnabled]);

    const handleSeek = useCallback((_progressPercent: number) => {
        if (duration > 0) {
            // This would need to be implemented in the audio context
            // const newTime = (progressPercent / 100) * duration;
            // setCurrentTime(newTime);
        }
    }, [duration]);

    const handleControllBarDrag = useCallback((_deltaY: number) => {
        // Handle drag feedback - could show preview of expanded state
    }, []);

    const handleControllBarDragEnd = useCallback((velocity: number, deltaY: number) => {
        // Determine whether to expand or collapse based on gesture
        if (Math.abs(deltaY) > 50 || Math.abs(velocity) > 0.5) {
            toggleAudioTrackbar();
        }
    }, [toggleAudioTrackbar]);

    const handleControllBarTap = useCallback(() => {
        toggleAudioTrackbar();
    }, [toggleAudioTrackbar]);

    if (!currentSnap) {
        return null; // Don't render if no audio is playing
    }

    return (
        <VStack theme={theme}>
            <ControllBar 
                onDrag={handleControllBarDrag}
                onDragEnd={handleControllBarDragEnd}
                onTap={handleControllBarTap}
                isExpanded={isAudioTrackbarOpen}
            />
            
            {isAudioTrackbarOpen && (
                <VStack theme={theme} ph="xl" pv="lg" gap="xl">
                    {/* Context Items - Script Dialog */}
                    {contexts.length > 0 && (
                        <VStack theme={theme} gap="sm">
                            {contexts.map((context, index) => {
                                const isActive = currentTime >= context.timeline && 
                                    (index === contexts.length - 1 || currentTime < contexts[index + 1]?.timeline);
                                
                                return (
                                    <HStack 
                                        key={context.id} 
                                        theme={theme} 
                                        gap="sm" 
                                        p="sm" 
                                        r="md"
                                        bgColor={isActive ? "primaryContainer" : "surface"}
                                    >
                                        {context.roles?.map((role) => (
                                            <Icon 
                                                key={role.id}
                                                isDarkTheme={theme.type === 'dark'} 
                                                lightSrc={role.type === 'HOST' ? 'ic_host' : 'ic_character'} 
                                                darkSrc={role.type === 'HOST' ? 'ic_host' : 'ic_character'} 
                                                size="20px" 
                                            />
                                        ))}
                                        <Text theme={theme} color="onSurface">
                                            {context.message}
                                        </Text>
                                    </HStack>
                                );
                            })}
                        </VStack>
                    )}
                </VStack>
            )}

            <VStack theme={theme} p="xl" gap="xl">
                <VStack theme={theme} gap="md">
                    <Text theme={theme} color="onSurface">
                        {currentSnap.title}
                    </Text>
                    <Text theme={theme} color="onSurfaceVariant">
                        {currentSnap.channel?.name} • {currentSnap.channel?.author?.name}
                    </Text>
                    {isLoadingQueue && (
                        <Text theme={theme} color="primary">
                            Adding songs to queue...
                        </Text>
                    )}
                </VStack>
                
                <ProgressBar progress={progress} onSeek={handleSeek} />
                
                <HStack theme={theme} gap="40px" justifyCenter>
                    <div onClick={playPrevious} style={{ cursor: 'pointer' }}>
                        <Icon 
                            isDarkTheme={theme.type === 'dark'} 
                            lightSrc="ic_prev" 
                            darkSrc="ic_prev" 
                            size="28px"
                        />
                    </div>
                    
                    <Button 
                        theme={theme} 
                        variant="outline" 
                        color="primary" 
                        onClick={togglePlayPause} 
                        radius="50%" 
                        ph="md" 
                        pv="md"
                    >
                        <Icon 
                            isDarkTheme={theme.type === 'dark'} 
                            lightSrc={isPlaying ? "ic_pause" : "ic_play"} 
                            darkSrc={isPlaying ? "ic_pause" : "ic_play"} 
                            size="28px" 
                        />
                    </Button>
                    
                    <div onClick={playNext} style={{ cursor: 'pointer' }}>
                        <Icon 
                            isDarkTheme={theme.type === 'dark'} 
                            lightSrc="ic_next" 
                            darkSrc="ic_next" 
                            size="28px"
                        />
                    </div>
                </HStack>

                {/* Auto-play toggle */}
                <HStack theme={theme} justifyCenter gap="sm">
                    <Text theme={theme} color="onSurfaceVariant">
                        Auto-play
                    </Text>
                    <Button
                        theme={theme}
                        variant={autoPlayEnabled ? "primary" : "outline"}
                        color="primary"
                        onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                        ph="sm"
                        pv="xs"
                    >
                        <Text theme={theme} color={autoPlayEnabled ? "onPrimary" : "primary"}>
                            {autoPlayEnabled ? "ON" : "OFF"}
                        </Text>
                    </Button>
                </HStack>
            </VStack>
        </VStack>
    )
}

export default AudioBottomSheet