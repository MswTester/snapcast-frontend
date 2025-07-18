import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Snap } from "../types";
import { ApiService } from "../services/api";

export interface AudioContextType {
    audioContext: AudioContext | null;
    isPlaying: boolean;
    togglePlayPause: () => void;
    setVolume: (_volume: number) => void;
    currentTime: number;
    duration: number;
    setCurrentTime: (_time: number) => void;
    loadAudio: (_url: string) => Promise<void>;
    source: AudioBufferSourceNode | null;
    gainNode: GainNode | null;
    queue: number[];
    currentSnapId: number | null;
    currentSnap: Snap | null;
    addToQueue: (_snapId: number) => void;
    removeFromQueue: (_snapId: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    clearQueue: () => void;
    playSnapById: (_snapId: number) => void;
    loadSnapById: (_snapId: number) => Promise<void>;
    currentIndex: number;
    autoPlayEnabled: boolean;
    setAutoPlayEnabled: (_enabled: boolean) => void;
    playSnap: (_snapId: number) => Promise<void>;
    addAllToQueue: (_snapIds: number[]) => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTimeState] = useState(0);
    const [duration, setDuration] = useState(0);
    const [_volume, setVolumeState] = useState(1);
    const [source, setSource] = useState<AudioBufferSourceNode | null>(null);
    const [gainNode, setGainNode] = useState<GainNode | null>(null);
    const [queue, setQueue] = useState<number[]>([]);
    const [currentSnapId, setCurrentSnapId] = useState<number | null>(null);
    const [currentSnap, setCurrentSnap] = useState<Snap | null>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

    useEffect(() => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const gain = ctx.createGain();
        gain.connect(ctx.destination);
        setAudioContext(ctx);
        setGainNode(gain);
        
        return () => {
            ctx.close();
        };
    }, []);
    
    const togglePlayPause = () => {
        if (isPlaying) {
            audioContext?.suspend();
            setIsPlaying(false);
        } else {
            audioContext?.resume();
            setIsPlaying(true);
        }
    }

    const setVolume = (_volume: number) => {
        setVolumeState(_volume);
        if (gainNode) {
            gainNode.gain.value = _volume;
        }
    }

    const setCurrentTime = (_time: number) => {
        setCurrentTimeState(_time);
    }

    const fetchSnap = async (snapId: number): Promise<Snap> => {
        const response = await ApiService.getSnapInfo(snapId);
        return response.data;
    };

    const addToQueue = useCallback((_snapId: number) => {
        setQueue(prev => [...prev, _snapId]);
    }, []);

    const getRandomPopularSnap = useCallback(async (): Promise<number | null> => {
        try {
            const response = await ApiService.getPopularSnaps();
            const popularSnaps = response.data;
            if (popularSnaps.length > 0) {
                const randomSnap = popularSnaps[Math.floor(Math.random() * popularSnaps.length)];
                return randomSnap.id;
            }
        } catch (error) {
            console.error("Failed to get random popular snap:", error);
        }
        return null;
    }, []);

    const playNext = useCallback(async () => {
        if (currentIndex < queue.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextSnapId = queue[nextIndex];
            setCurrentIndex(nextIndex);
            await loadSnapById(nextSnapId);
        } else if (autoPlayEnabled) {
            // Queue ended, get a random popular snap
            const randomSnapId = await getRandomPopularSnap();
            if (randomSnapId) {
                addToQueue(randomSnapId);
                setCurrentIndex(queue.length);
                await loadSnapById(randomSnapId);
            }
        }
    }, [currentIndex, queue, autoPlayEnabled, getRandomPopularSnap, addToQueue]);

    const loadAudio = useCallback(async (_url: string) => {
        if (!audioContext || !gainNode) return;
        
        try {
            if (source) {
                source.stop();
            }
            
            const response = await fetch(_url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            
            const newSource = audioContext.createBufferSource();
            newSource.buffer = audioBuffer;
            newSource.connect(gainNode);
            
            newSource.onended = () => {
                setIsPlaying(false);
                playNext();
            };
            
            newSource.start();
            setSource(newSource);
            setDuration(audioBuffer.duration);
            setIsPlaying(true);
        } catch (error) {
            console.error('Error loading audio:', error);
        }
    }, [audioContext, gainNode, source, currentIndex, queue, playNext]);

    const removeFromQueue = useCallback((_snapId: number) => {
        setQueue(prev => prev.filter(id => id !== _snapId));
        if (currentSnapId === _snapId) {
            playNext();
        }
    }, [currentSnapId, playNext]);

    const loadSnapById = useCallback(async (_snapId: number) => {
        try {
            const snap = await fetchSnap(_snapId);
            setCurrentSnap(snap);
            setCurrentSnapId(_snapId);
            setDuration(snap.duration);
            
            await loadAudio(snap.streamUrl);
        } catch (error) {
            console.error('Error loading snap:', error);
        }
    }, [loadAudio]);

    const clearQueue = useCallback(() => {
        setQueue([]);
        setCurrentSnapId(null);
        setCurrentSnap(null);
        setCurrentIndex(-1);
        source?.stop();
        setSource(null);
        setIsPlaying(false);
    }, [source]);

    const playPrevious = useCallback(async () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            const prevSnapId = queue[prevIndex];
            setCurrentIndex(prevIndex);
            await loadSnapById(prevSnapId);
        }
    }, [currentIndex, queue, loadSnapById]);

    const playSnapById = useCallback(async (_snapId: number) => {
        const index = queue.indexOf(_snapId);
        if (index !== -1) {
            setCurrentIndex(index);
            await loadSnapById(_snapId);
        } else {
            addToQueue(_snapId);
            setCurrentIndex(queue.length);
            await loadSnapById(_snapId);
        }
    }, [queue, addToQueue, loadSnapById]);
    
    const playSnap = useCallback(async (_snapId: number) => {
        // Clear current queue and play this snap immediately
        setQueue([_snapId]);
        setCurrentIndex(0);
        await loadSnapById(_snapId);
    }, [loadSnapById]);
    
    const addAllToQueue = useCallback((_snapIds: number[]) => {
        setQueue(prev => [...prev, ..._snapIds]);
    }, []);

    return (
        <AudioContext.Provider value={{
            audioContext,
            isPlaying,
            togglePlayPause,
            setVolume,
            currentTime,
            duration,
            setCurrentTime,
            loadAudio,
            source,
            gainNode,
            queue,
            currentSnapId,
            currentSnap,
            addToQueue,
            removeFromQueue,
            playNext,
            playPrevious,
            clearQueue,
            playSnapById,
            loadSnapById,
            currentIndex,
            autoPlayEnabled,
            setAutoPlayEnabled,
            playSnap,
            addAllToQueue
        }}>
            {children}
        </AudioContext.Provider>
    );
}