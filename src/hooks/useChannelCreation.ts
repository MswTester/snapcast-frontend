import { useState, useCallback } from "react";
import { useChannel } from "./useChannel";
import { useFileUpload } from "./useFileUpload";
import type { Channel } from "../types";

export interface ChannelCreationStep {
  step: "name" | "image" | "concept" | "completed";
  data: {
    name: string;
    avatar: string;
    instruction: string;
  };
}

export const useChannelCreation = () => {
  const { createChannel } = useChannel();
  const { convertFileToBase64, validateImageFile } = useFileUpload();
  
  const [currentStep, setCurrentStep] = useState<ChannelCreationStep["step"]>("name");
  const [channelData, setChannelData] = useState<ChannelCreationStep["data"]>({
    name: "",
    avatar: "",
    instruction: "",
  });
  const [createdChannel, setCreatedChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = useCallback((field: keyof ChannelCreationStep["data"], value: string) => {
    setChannelData(prev => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  }, []);

  const validateName = useCallback((): boolean => {
    const { name } = channelData;
    
    if (!name.trim()) {
      setError("Channel name is required");
      return false;
    }
    
    if (name.trim().length < 3) {
      setError("Channel name must be at least 3 characters");
      return false;
    }
    
    if (name.trim().length > 50) {
      setError("Channel name must be less than 50 characters");
      return false;
    }
    
    return true;
  }, [channelData]);

  const validateImage = useCallback((): boolean => {
    const { avatar } = channelData;
    
    if (!avatar) {
      setError("Please upload a channel image");
      return false;
    }
    
    return true;
  }, [channelData]);

  const validateConcept = useCallback((): boolean => {
    const { instruction } = channelData;
    
    if (!instruction.trim()) {
      setError("AI DJ concept is required");
      return false;
    }
    
    if (instruction.trim().length < 10) {
      setError("AI DJ concept must be at least 10 characters");
      return false;
    }
    
    if (instruction.trim().length > 500) {
      setError("AI DJ concept must be less than 500 characters");
      return false;
    }
    
    return true;
  }, [channelData]);

  const goToStep = useCallback((step: ChannelCreationStep["step"]) => {
    setCurrentStep(step);
    setError(null);
  }, []);

  const nextStep = useCallback((): boolean => {
    let isValid = false;
    
    switch (currentStep) {
      case "name":
        isValid = validateName();
        if (isValid) setCurrentStep("image");
        break;
      case "image":
        isValid = validateImage();
        if (isValid) setCurrentStep("concept");
        break;
      case "concept":
        isValid = validateConcept();
        if (isValid) setCurrentStep("completed");
        break;
    }
    
    return isValid;
  }, [currentStep, validateName, validateImage, validateConcept]);

  const previousStep = useCallback(() => {
    switch (currentStep) {
      case "image":
        setCurrentStep("name");
        break;
      case "concept":
        setCurrentStep("image");
        break;
      case "completed":
        setCurrentStep("concept");
        break;
    }
    setError(null);
  }, [currentStep]);

  const uploadImage = useCallback(async (file: File): Promise<boolean> => {
    if (!validateImageFile(file)) {
      return false;
    }

    try {
      const base64 = await convertFileToBase64(file);
      if (base64) {
        updateData("avatar", base64);
        return true;
      } else {
        setError("Failed to process channel image");
        return false;
      }
    } catch (err) {
      setError("Failed to upload channel image");
      return false;
    }
  }, [convertFileToBase64, validateImageFile, updateData]);

  const completeChannelCreation = useCallback(async (): Promise<Channel | null> => {
    if (!validateName() || !validateImage() || !validateConcept()) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const channel = await createChannel({
        name: channelData.name.trim(),
        avatar: channelData.avatar,
        instruction: channelData.instruction.trim(),
      });
      
      if (channel) {
        setCreatedChannel(channel);
        setCurrentStep("completed");
        return channel;
      } else {
        setError("Failed to create channel");
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Channel creation failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [createChannel, channelData, validateName, validateImage, validateConcept]);

  const reset = useCallback(() => {
    setCurrentStep("name");
    setChannelData({
      name: "",
      avatar: "",
      instruction: "",
    });
    setCreatedChannel(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    currentStep,
    channelData,
    createdChannel,
    isLoading,
    error,
    updateData,
    goToStep,
    nextStep,
    previousStep,
    uploadImage,
    completeChannelCreation,
    reset,
  };
};