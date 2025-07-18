import { useState, useCallback, useEffect } from "react";
import { ApiService } from "../services/api";
import type { Snap, Channel } from "../types";

export const useRecommendations = () => {
  const [popular, setPopular] = useState<Snap[]>([]);
  const [trending, setTrending] = useState<Snap[]>([]);
  const [byTags, setByTags] = useState<Snap[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPopular = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.getPopularSnaps();
      setPopular(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load popular snaps");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadTrending = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.getTrendingSnaps();
      setTrending(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load trending snaps");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadByTags = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.getRecommendedByTags();
      setByTags(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tag-based recommendations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadByChannel = useCallback(async (channelId: number): Promise<Snap[]> => {
    try {
      const response = await ApiService.getRecommendedByChannel(channelId);
      return response.data;
    } catch (err) {
      console.error("Failed to load channel recommendations:", err);
      return [];
    }
  }, []);

  const getRandomPopular = useCallback((): Snap | null => {
    if (popular.length === 0) return null;
    return popular[Math.floor(Math.random() * popular.length)];
  }, [popular]);

  useEffect(() => {
    loadPopular();
    loadTrending();
    loadByTags();
  }, [loadPopular, loadTrending, loadByTags]);

  return {
    popular,
    trending,
    byTags,
    isLoading,
    error,
    loadPopular,
    loadTrending,
    loadByTags,
    loadByChannel,
    getRandomPopular,
  };
};