import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useFileUpload } from "./useFileUpload";
import type { Gender } from "../types";

export interface RegistrationStep {
  step: "email" | "name" | "gender" | "avatar" | "completed";
  data: {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    gender: Gender | null;
    avatar: string;
  };
}

export const useRegistration = () => {
  const { register } = useAuth();
  const { convertFileToBase64, validateImageFile } = useFileUpload();
  
  const [currentStep, setCurrentStep] = useState<RegistrationStep["step"]>("email");
  const [registrationData, setRegistrationData] = useState<RegistrationStep["data"]>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    gender: null,
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = useCallback((field: keyof RegistrationStep["data"], value: any) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  }, []);

  const validateEmail = useCallback((): boolean => {
    const { email, password, passwordConfirm } = registrationData;
    
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    
    if (!password) {
      setError("Password is required");
      return false;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return false;
    }
    
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  }, [registrationData]);

  const validateName = useCallback((): boolean => {
    const { name } = registrationData;
    
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }
    
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    
    return true;
  }, [registrationData]);

  const validateGender = useCallback((): boolean => {
    const { gender } = registrationData;
    
    if (!gender) {
      setError("Please select a gender");
      return false;
    }
    
    return true;
  }, [registrationData]);

  const validateAvatar = useCallback((): boolean => {
    const { avatar } = registrationData;
    
    if (!avatar) {
      setError("Please upload an avatar");
      return false;
    }
    
    return true;
  }, [registrationData]);

  const goToStep = useCallback((step: RegistrationStep["step"]) => {
    setCurrentStep(step);
    setError(null);
  }, []);

  const nextStep = useCallback((): boolean => {
    let isValid = false;
    
    switch (currentStep) {
      case "email":
        isValid = validateEmail();
        if (isValid) setCurrentStep("name");
        break;
      case "name":
        isValid = validateName();
        if (isValid) setCurrentStep("gender");
        break;
      case "gender":
        isValid = validateGender();
        if (isValid) setCurrentStep("avatar");
        break;
      case "avatar":
        isValid = validateAvatar();
        if (isValid) setCurrentStep("completed");
        break;
    }
    
    return isValid;
  }, [currentStep, validateEmail, validateName, validateGender, validateAvatar]);

  const previousStep = useCallback(() => {
    switch (currentStep) {
      case "name":
        setCurrentStep("email");
        break;
      case "gender":
        setCurrentStep("name");
        break;
      case "avatar":
        setCurrentStep("gender");
        break;
      case "completed":
        setCurrentStep("avatar");
        break;
    }
    setError(null);
  }, [currentStep]);

  const uploadAvatar = useCallback(async (file: File): Promise<boolean> => {
    if (!validateImageFile(file)) {
      return false;
    }

    try {
      const base64 = await convertFileToBase64(file);
      if (base64) {
        updateData("avatar", base64);
        return true;
      } else {
        setError("Failed to process avatar image");
        return false;
      }
    } catch (err) {
      setError("Failed to upload avatar");
      return false;
    }
  }, [convertFileToBase64, validateImageFile, updateData]);

  const completeRegistration = useCallback(async (): Promise<boolean> => {
    if (!validateEmail() || !validateName() || !validateGender() || !validateAvatar()) {
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await register({
        email: registrationData.email,
        password: registrationData.password,
        name: registrationData.name.trim(),
        gender: registrationData.gender!,
        avatar: registrationData.avatar,
      });
      
      setCurrentStep("completed");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [register, registrationData, validateEmail, validateName, validateGender, validateAvatar]);

  const reset = useCallback(() => {
    setCurrentStep("email");
    setRegistrationData({
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      gender: null,
      avatar: "",
    });
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    currentStep,
    registrationData,
    isLoading,
    error,
    updateData,
    goToStep,
    nextStep,
    previousStep,
    uploadAvatar,
    completeRegistration,
    reset,
  };
};