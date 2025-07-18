import { useState, useCallback, useEffect } from "react";
import { ApiService } from "../services/api";
import type { Snap } from "../types";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Snap[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiService.search(searchQuery);
      setResults(response.data);
      setQuery(searchQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadSuggestions = useCallback(async () => {
    try {
      const response = await ApiService.getSearchSuggestions();
      setSuggestions(response.data);
    } catch (err) {
      console.error("Failed to load search suggestions:", err);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  return {
    query,
    results,
    suggestions,
    isLoading,
    error,
    search,
    clearSearch,
    loadSuggestions,
  };
};