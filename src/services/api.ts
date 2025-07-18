import type { 
  ApiResponse, 
  Snap, 
  Channel, 
  Tag
} from "../types";

const BASE_URL = "http://localhost:8000";

export class ApiService {
  private static getAuthHeaders(): HeadersInit {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) return {};
    
    try {
      const { accessToken } = JSON.parse(tokens);
      return { Authorization: `Bearer ${accessToken}` };
    } catch {
      return {};
    }
  }

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Generic CRUD operations
  static async getModel<T>(model: string): Promise<ApiResponse<T[]>> {
    return this.request(`/api/${model}/`);
  }

  static async getModelById<T>(model: string, id: number): Promise<ApiResponse<T>> {
    return this.request(`/api/${model}/${id}`);
  }

  static async createModel<T>(model: string, data: any): Promise<ApiResponse<T>> {
    return this.request(`/api/${model}/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async updateModel<T>(model: string, id: number, data: any): Promise<ApiResponse<T>> {
    return this.request(`/api/${model}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  static async patchModel<T>(model: string, id: number, data: any): Promise<ApiResponse<T>> {
    return this.request(`/api/${model}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  static async deleteModel(model: string, id: number): Promise<ApiResponse<void>> {
    return this.request(`/api/${model}/${id}`, {
      method: "DELETE",
    });
  }

  // Search endpoints
  static async search(query: string): Promise<ApiResponse<Snap[]>> {
    return this.request("/search/", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
  }

  static async getSearchSuggestions(): Promise<ApiResponse<string[]>> {
    return this.request("/search/suggestions");
  }

  // Recommendation endpoints
  static async getPopularSnaps(): Promise<ApiResponse<Snap[]>> {
    return this.request("/recommended/popular");
  }

  static async getTrendingSnaps(): Promise<ApiResponse<Snap[]>> {
    return this.request("/recommended/trending");
  }

  static async getRecommendedByChannel(channelId: number): Promise<ApiResponse<Snap[]>> {
    return this.request(`/recommended/by-channel/${channelId}`);
  }

  static async getRecommendedByTags(): Promise<ApiResponse<Snap[]>> {
    return this.request("/recommended/by-tags");
  }

  // Snap endpoints
  static async getSnapInfo(id: number): Promise<ApiResponse<Snap>> {
    return this.request(`/snap/${id}/info`);
  }

  static async getRelatedSnaps(id: number): Promise<ApiResponse<Snap[]>> {
    return this.request(`/snap/${id}/related`);
  }

  // Podcast generation endpoints
  static async generatePodcastQuestions(story: string): Promise<ApiResponse<string[]>> {
    return this.request("/ai/podcast/questions", {
      method: "POST",
      body: JSON.stringify({ story }),
    });
  }

  static async generatePodcastSnap(data: {
    story: string;
    questions: string[];
    answers: string[];
    channelId: number;
  }): Promise<ApiResponse<{ snapId: number }>> {
    return this.request("/ai/podcast/snap", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async generatePodcast(data: {
    title: string;
    channelId: number;
    script?: string;
  }): Promise<ApiResponse<{ snapId: number }>> {
    return this.request("/podcast/generate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async generatePodcastScript(data: {
    title: string;
    description?: string;
    channelId: number;
  }): Promise<ApiResponse<{ script: string }>> {
    return this.request("/podcast/script", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async getPodcastStatus(snapId: number): Promise<ApiResponse<{
    status: "pending" | "processing" | "completed" | "failed";
    progress?: number;
    error?: string;
  }>> {
    return this.request(`/podcast/status/${snapId}`);
  }

  // Upload endpoints
  static async uploadAudio(snapId: number, file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append("audio", file);

    return fetch(`${BASE_URL}/upload/audio/${snapId}`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: formData,
    }).then(res => res.json());
  }

  static async uploadExternalAudio(snapId: number, url: string): Promise<ApiResponse<{ url: string }>> {
    return this.request(`/upload/external/${snapId}`, {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  }

  // Model-specific shortcuts
  static async getChannels(): Promise<ApiResponse<Channel[]>> {
    return this.getModel<Channel>("channel") as Promise<ApiResponse<Channel[]>>;
  }

  static async getChannel(id: number): Promise<ApiResponse<Channel>> {
    return this.getModelById<Channel>("channel", id);
  }

  static async createChannel(data: Partial<Channel>): Promise<ApiResponse<Channel>> {
    return this.createModel<Channel>("channel", data);
  }

  static async updateChannel(id: number, data: Partial<Channel>): Promise<ApiResponse<Channel>> {
    return this.updateModel<Channel>("channel", id, data);
  }

  static async deleteChannel(id: number): Promise<ApiResponse<void>> {
    return this.deleteModel("channel", id);
  }

  static async getSnaps(): Promise<ApiResponse<Snap[]>> {
    return this.getModel<Snap>("snap") as Promise<ApiResponse<Snap[]>>;
  }

  static async getSnap(id: number): Promise<ApiResponse<Snap>> {
    return this.getModelById<Snap>("snap", id);
  }

  static async createSnap(data: Partial<Snap>): Promise<ApiResponse<Snap>> {
    return this.createModel<Snap>("snap", data);
  }

  static async updateSnap(id: number, data: Partial<Snap>): Promise<ApiResponse<Snap>> {
    return this.updateModel<Snap>("snap", id, data);
  }

  static async deleteSnap(id: number): Promise<ApiResponse<void>> {
    return this.deleteModel("snap", id);
  }

  static async getTags(): Promise<ApiResponse<Tag[]>> {
    return this.getModel<Tag>("tag") as Promise<ApiResponse<Tag[]>>;
  }

  static async createTag(data: Partial<Tag>): Promise<ApiResponse<Tag>> {
    return this.createModel<Tag>("tag", data);
  }
}