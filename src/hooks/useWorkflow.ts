import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import type { Channel, Snap } from "../types";

export type WorkflowStep = 
  | "home"
  | "login" 
  | "register"
  | "name"
  | "gender"
  | "avatar"
  | "search"
  | "channel"
  | "channelCreationName"
  | "channelCreationImage"
  | "channelCreationConcept"
  | "snapCreationStory"
  | "snapCreationQuestions";

export interface WorkflowState {
  currentStep: WorkflowStep;
  previousStep: WorkflowStep | null;
  navigationStack: WorkflowStep[];
  isProfileOverlayOpen: boolean;
  isAudioTrackbarOpen: boolean;
  searchQuery: string;
  selectedChannel: Channel | null;
  selectedSnap: Snap | null;
}

export const useWorkflow = () => {
  const { isAuthenticated, user } = useAuth();
  
  const [state, setState] = useState<WorkflowState>({
    currentStep: "home",
    previousStep: null,
    navigationStack: ["home"],
    isProfileOverlayOpen: false,
    isAudioTrackbarOpen: false,
    searchQuery: "",
    selectedChannel: null,
    selectedSnap: null,
  });

  const navigateTo = useCallback((step: WorkflowStep, addToStack: boolean = true) => {
    setState(prev => ({
      ...prev,
      previousStep: prev.currentStep,
      currentStep: step,
      navigationStack: addToStack 
        ? [...prev.navigationStack, step]
        : prev.navigationStack,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState(prev => {
      if (prev.navigationStack.length <= 1) {
        return prev; // Can't go back further
      }
      
      const newStack = [...prev.navigationStack];
      newStack.pop(); // Remove current step
      const previousStep = newStack[newStack.length - 1];
      
      return {
        ...prev,
        previousStep: prev.currentStep,
        currentStep: previousStep,
        navigationStack: newStack,
      };
    });
  }, []);

  const navigateToHome = useCallback(() => {
    setState(prev => ({
      ...prev,
      previousStep: prev.currentStep,
      currentStep: "home",
      navigationStack: ["home"],
    }));
  }, []);

  const handleProfileClick = useCallback(() => {
    if (!isAuthenticated) {
      navigateTo("login");
    } else {
      setState(prev => ({
        ...prev,
        isProfileOverlayOpen: true,
      }));
    }
  }, [isAuthenticated, navigateTo]);

  const closeProfileOverlay = useCallback(() => {
    setState(prev => ({
      ...prev,
      isProfileOverlayOpen: false,
    }));
  }, []);

  const handleMyChannelClick = useCallback(() => {
    if (user?.myChannel) {
      setState(prev => ({
        ...prev,
        selectedChannel: user.myChannel!,
        isProfileOverlayOpen: false,
      }));
      navigateTo("channel");
    } else {
      setState(prev => ({
        ...prev,
        isProfileOverlayOpen: false,
      }));
      navigateTo("channelCreationName");
    }
  }, [user, navigateTo]);

  const handleChannelClick = useCallback((channel: Channel) => {
    setState(prev => ({
      ...prev,
      selectedChannel: channel,
    }));
    navigateTo("channel");
  }, [navigateTo]);

  const handleSnapClick = useCallback((snap: Snap, _playImmediately: boolean = true) => {
    setState(prev => ({
      ...prev,
      selectedSnap: snap,
    }));
    
    // If _playImmediately is true, the audio context will handle playing the snap
    // This is controlled by the UI components that call this function
  }, []);

  const handleSearchQuery = useCallback((query: string) => {
    setState(prev => ({
      ...prev,
      searchQuery: query,
    }));
    
    if (query.trim()) {
      navigateTo("search");
    }
  }, [navigateTo]);

  const handleSnapCreation = useCallback(() => {
    navigateTo("snapCreationStory");
  }, [navigateTo]);

  const toggleAudioTrackbar = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAudioTrackbarOpen: !prev.isAudioTrackbarOpen,
    }));
  }, []);

  const openAudioTrackbar = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAudioTrackbarOpen: true,
    }));
  }, []);

  const closeAudioTrackbar = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAudioTrackbarOpen: false,
    }));
  }, []);

  const handleRegisterFlow = useCallback(() => {
    navigateTo("register");
  }, [navigateTo]);

  const handleLoginFlow = useCallback(() => {
    navigateTo("login");
  }, [navigateTo]);

  const handleRegistrationStep = useCallback((step: "name" | "gender" | "avatar") => {
    navigateTo(step);
  }, [navigateTo]);

  const handleChannelCreationStep = useCallback((step: "channelCreationName" | "channelCreationImage" | "channelCreationConcept") => {
    navigateTo(step);
  }, [navigateTo]);

  const handleSnapCreationStep = useCallback((step: "snapCreationStory" | "snapCreationQuestions") => {
    navigateTo(step);
  }, [navigateTo]);

  const clearSearch = useCallback(() => {
    setState(prev => ({
      ...prev,
      searchQuery: "",
    }));
  }, []);

  const resetWorkflow = useCallback(() => {
    setState({
      currentStep: "home",
      previousStep: null,
      navigationStack: ["home"],
      isProfileOverlayOpen: false,
      isAudioTrackbarOpen: false,
      searchQuery: "",
      selectedChannel: null,
      selectedSnap: null,
    });
  }, []);

  const toggleSearchModal = useCallback(() => {
    if (state.currentStep === "search") {
      goBack();
    } else {
      navigateTo("search");
    }
  }, [state.currentStep, goBack, navigateTo]);

  return {
    ...state,
    navigateTo,
    goBack,
    navigateToHome,
    handleProfileClick,
    closeProfileOverlay,
    handleMyChannelClick,
    handleChannelClick,
    handleSnapClick,
    handleSearchQuery,
    handleSnapCreation,
    toggleAudioTrackbar,
    openAudioTrackbar,
    closeAudioTrackbar,
    handleRegisterFlow,
    handleLoginFlow,
    handleRegistrationStep,
    handleChannelCreationStep,
    handleSnapCreationStep,
    clearSearch,
    resetWorkflow,
    toggleSearchModal,
  };
};