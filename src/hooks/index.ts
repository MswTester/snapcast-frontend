// Authentication and User Management
export { useAuth } from "./useAuth";
export { useRegistration } from "./useRegistration";

// Audio and Playback
export { useAudio } from "./useAudio";

// Content Discovery
export { useSearch } from "./useSearch";
export { useRecommendations } from "./useRecommendations";

// Channel Management
export { useChannel } from "./useChannel";
export { useChannelCreation } from "./useChannelCreation";

// Content Creation
export { useSnapCreation } from "./useSnapCreation";
export { useFileUpload } from "./useFileUpload";

// Application Workflow
export { useWorkflow } from "./useWorkflow";

// Re-export types for convenience
export type {
  SnapCreationData,
  PodcastGenerationData,
} from "./useSnapCreation";

export type {
  UploadProgress,
} from "./useFileUpload";

export type {
  RegistrationStep,
} from "./useRegistration";

export type {
  ChannelCreationStep,
} from "./useChannelCreation";

export type {
  WorkflowStep,
  WorkflowState,
} from "./useWorkflow";