import { VStack } from "../primitives/layout/VStack";
import { useTheme } from "@emotion/react";
import { useState, useRef, useCallback } from "react";
import type { Theme } from "../../themes/types";

interface ControllBarProps {
    onDrag?: (deltaY: number) => void;
    onDragEnd?: (velocity: number, deltaY: number) => void;
    onTap?: () => void;
    isExpanded?: boolean;
}

const ControllBar = ({ onDrag, onDragEnd, onTap, isExpanded = false }: ControllBarProps) => {
    const theme = useTheme() as Theme;
    const [isDragging, setIsDragging] = useState(false);
    const touchRef = useRef<{
        startY: number;
        startTime: number;
        lastY: number;
        lastTime: number;
    } | null>(null);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchRef.current = {
            startY: touch.clientY,
            startTime: Date.now(),
            lastY: touch.clientY,
            lastTime: Date.now(),
        };
        setIsDragging(true);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!touchRef.current || !isDragging) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        const deltaY = touchRef.current.startY - touch.clientY;
        
        // Update last position for velocity calculation
        touchRef.current.lastY = touch.clientY;
        touchRef.current.lastTime = Date.now();
        
        onDrag?.(deltaY);
    }, [isDragging, onDrag]);

    const handleTouchEnd = useCallback((_e: React.TouchEvent) => {
        if (!touchRef.current || !isDragging) return;
        
        const endTime = Date.now();
        const timeDiff = endTime - touchRef.current.lastTime;
        const deltaY = touchRef.current.startY - touchRef.current.lastY;
        const totalDeltaY = touchRef.current.startY - touchRef.current.lastY;
        
        // Calculate velocity (pixels per millisecond)
        const velocity = timeDiff > 0 ? deltaY / timeDiff : 0;
        
        // Check if it's a tap (small movement and short duration)
        const isTap = Math.abs(totalDeltaY) < 10 && (endTime - touchRef.current.startTime) < 300;
        
        if (isTap) {
            onTap?.();
        } else {
            onDragEnd?.(velocity, totalDeltaY);
        }
        
        setIsDragging(false);
        touchRef.current = null;
    }, [isDragging, onDragEnd, onTap]);

    const handleTouchCancel = useCallback(() => {
        setIsDragging(false);
        touchRef.current = null;
    }, []);

    return (
        <VStack 
            theme={theme} 
            p="lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                touchAction: 'none',
                transition: isDragging ? 'none' : 'all 0.3s ease',
                opacity: isDragging ? 0.8 : 1,
            }}
        >
            <VStack 
                theme={theme} 
                w="48px" 
                h="4px" 
                r="50%" 
                bgColor="onSurface"
                style={{
                    transition: isDragging ? 'none' : 'all 0.3s ease',
                    transform: isDragging ? 'scaleY(1.5)' : 'scaleY(1)',
                    backgroundColor: isExpanded 
                        ? theme.colors.primary 
                        : theme.colors.onSurface,
                }}
            />
        </VStack>
    );
};

export default ControllBar;
