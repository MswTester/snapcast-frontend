import { useState, useCallback } from "react";
import { ApiService } from "../services/api";
import type { Snap } from "../types";

export interface SnapCreationData {
  story: string;
  questions: string[];
  answers: string[];
  channelId: number;
  title?: string;
}

export interface PodcastGenerationData {
  title: string;
  channelId: number;
  script?: string;
  description?: string;
}

export const useSnapCreation = () => {
  const [currentStep, setCurrentStep] = useState<"story" | "questions" | "generating" | "completed">("story");
  const [story, setStory] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [generatedSnapId, setGeneratedSnapId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generateQuestions = useCallback(async (storyText: string): Promise<string[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.generatePodcastQuestions(storyText);
      const generatedQuestions = response.data;
      setQuestions(generatedQuestions);
      setAnswers(new Array(generatedQuestions.length).fill(""));
      setStory(storyText);
      setCurrentStep("questions");
      return generatedQuestions;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate questions");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAnswer = useCallback((index: number, answer: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  }, []);

  const createSnap = useCallback(async (channelId: number): Promise<number | null> => {
    if (!story || questions.length === 0 || answers.some(a => !a.trim())) {
      setError("Please complete all questions and answers");
      return null;
    }

    setIsLoading(true);
    setError(null);
    setCurrentStep("generating");
    setProgress(0);

    try {
      const response = await ApiService.generatePodcastSnap({
        story,
        questions,
        answers,
        channelId,
      });

      const snapId = response.data.snapId;
      setGeneratedSnapId(snapId);
      
      // Poll for completion status
      await pollSnapStatus(snapId);
      
      return snapId;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create snap");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [story, questions, answers]);

  const generatePodcast = useCallback(async (data: PodcastGenerationData): Promise<number | null> => {
    setIsLoading(true);
    setError(null);
    setCurrentStep("generating");
    setProgress(0);

    try {
      const response = await ApiService.generatePodcast(data);
      const snapId = response.data.snapId;
      setGeneratedSnapId(snapId);
      
      // Poll for completion status
      await pollSnapStatus(snapId);
      
      return snapId;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate podcast");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateScript = useCallback(async (data: {
    title: string;
    description?: string;
    channelId: number;
  }): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiService.generatePodcastScript(data);
      return response.data.script;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate script");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pollSnapStatus = useCallback(async (snapId: number) => {
    const maxAttempts = 60; // 5 minutes max (5s intervals)
    let attempts = 0;

    const poll = async (): Promise<void> => {
      try {
        const response = await ApiService.getPodcastStatus(snapId);
        const { status, progress: statusProgress, error: statusError } = response.data;

        if (statusProgress !== undefined) {
          setProgress(statusProgress);
        }

        switch (status) {
          case "completed":
            setCurrentStep("completed");
            setProgress(100);
            return;
          case "failed":
            setError(statusError || "Snap generation failed");
            return;
          case "processing":
          case "pending":
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(poll, 5000); // Poll every 5 seconds
            } else {
              setError("Snap generation timed out");
            }
            break;
        }
      } catch (err) {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 5000);
        } else {
          setError("Failed to check snap status");
        }
      }
    };

    poll();
  }, []);

  const reset = useCallback(() => {
    setCurrentStep("story");
    setStory("");
    setQuestions([]);
    setAnswers([]);
    setGeneratedSnapId(null);
    setError(null);
    setProgress(0);
  }, []);

  const goToStep = useCallback((step: "story" | "questions" | "generating" | "completed") => {
    setCurrentStep(step);
  }, []);

  return {
    currentStep,
    story,
    questions,
    answers,
    generatedSnapId,
    isLoading,
    error,
    progress,
    generateQuestions,
    updateAnswer,
    createSnap,
    generatePodcast,
    generateScript,
    reset,
    goToStep,
    setStory,
  };
};