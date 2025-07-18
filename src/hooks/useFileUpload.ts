import { useState, useCallback } from "react";
import { ApiService } from "../services/api";

export interface UploadProgress {
  progress: number;
  isUploading: boolean;
  error: string | null;
}

export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    isUploading: false,
    error: null,
  });

  const uploadAudio = useCallback(async (
    snapId: number,
    file: File
  ): Promise<string | null> => {
    setUploadProgress({
      progress: 0,
      isUploading: true,
      error: null,
    });

    try {
      const response = await ApiService.uploadAudio(snapId, file);
      
      setUploadProgress({
        progress: 100,
        isUploading: false,
        error: null,
      });

      return response.data.url;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Upload failed";
      setUploadProgress({
        progress: 0,
        isUploading: false,
        error,
      });
      return null;
    }
  }, []);

  const uploadExternalAudio = useCallback(async (
    snapId: number,
    url: string
  ): Promise<string | null> => {
    setUploadProgress({
      progress: 0,
      isUploading: true,
      error: null,
    });

    try {
      const response = await ApiService.uploadExternalAudio(snapId, url);
      
      setUploadProgress({
        progress: 100,
        isUploading: false,
        error: null,
      });

      return response.data.url;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Upload failed";
      setUploadProgress({
        progress: 0,
        isUploading: false,
        error,
      });
      return null;
    }
  }, []);

  const uploadAvatar = useCallback(async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        resolve(base64);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }, []);

  const convertFileToBase64 = useCallback(async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        resolve(base64);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }, []);

  const validateAudioFile = useCallback((file: File): boolean => {
    const allowedTypes = [
      'audio/mp3',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/m4a',
      'audio/aac'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadProgress(prev => ({
        ...prev,
        error: 'Invalid file type. Please upload an audio file.'
      }));
      return false;
    }

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      setUploadProgress(prev => ({
        ...prev,
        error: 'File size too large. Maximum size is 100MB.'
      }));
      return false;
    }

    return true;
  }, []);

  const validateImageFile = useCallback((file: File): boolean => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadProgress(prev => ({
        ...prev,
        error: 'Invalid file type. Please upload an image file.'
      }));
      return false;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadProgress(prev => ({
        ...prev,
        error: 'File size too large. Maximum size is 10MB.'
      }));
      return false;
    }

    return true;
  }, []);

  const resetUploadState = useCallback(() => {
    setUploadProgress({
      progress: 0,
      isUploading: false,
      error: null,
    });
  }, []);

  return {
    uploadProgress,
    uploadAudio,
    uploadExternalAudio,
    uploadAvatar,
    convertFileToBase64,
    validateAudioFile,
    validateImageFile,
    resetUploadState,
  };
};