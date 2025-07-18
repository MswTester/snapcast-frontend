import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  SubscribeRequest, 
  Plan, 
  ApiResponse, 
  AuthResponse, 
  AuthTokens 
} from "../types";

const BASE_URL = "http://localhost:8000";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (_credentials: LoginRequest) => Promise<void>;
  register: (_userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  subscribe: (_planData: SubscribeRequest) => Promise<void>;
  unsubscribe: () => Promise<void>;
  getPlans: () => Promise<Plan[]>;
  checkAuthStatus: () => Promise<void>;
  tokens: AuthTokens | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && !!tokens;

  const apiCall = async <T,>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(tokens?.accessToken && {
        Authorization: `Bearer ${tokens.accessToken}`
      }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401 && tokens?.refreshToken) {
        try {
          await refreshToken();
          const retryResponse = await fetch(url, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          if (retryResponse.ok) {
            return retryResponse.json();
          }
        } catch {
          await logout();
        }
      }
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  };

  const login = useCallback(async (_credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiCall<ApiResponse<AuthResponse>>("/auth/login", {
        method: "POST",
        body: JSON.stringify(_credentials),
      });
      
      if (response.data.tokens) {
        setTokens(response.data.tokens);
        localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
      }
      setUser(response.data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (_userData: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await apiCall<ApiResponse<AuthResponse>>("/auth/register", {
        method: "POST",
        body: JSON.stringify(_userData),
      });
      
      if (response.data.tokens) {
        setTokens(response.data.tokens);
        localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
      }
      setUser(response.data.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiCall("/auth/logout");
    } catch {
      // Continue with logout even if API call fails
    } finally {
      setUser(null);
      setTokens(null);
      localStorage.removeItem("tokens");
    }
  }, []);

  const refreshToken = useCallback(async () => {
    if (!tokens?.refreshToken) return;
    
    try {
      const response = await apiCall<ApiResponse<AuthTokens>>("/auth/refresh");
      const newTokens = response.data;
      setTokens(newTokens);
      localStorage.setItem("tokens", JSON.stringify(newTokens));
    } catch {
      await logout();
    }
  }, [tokens?.refreshToken]);

  const getCurrentUser = useCallback(async () => {
    if (!tokens) return;
    
    try {
      const response = await apiCall<ApiResponse<User>>("/auth/me");
      setUser(response.data);
    } catch {
      await logout();
    }
  }, [tokens]);

  const subscribe = useCallback(async (_planData: SubscribeRequest) => {
    const response = await apiCall<ApiResponse<AuthResponse>>("/auth/subscribe", {
      method: "POST",
      body: JSON.stringify(_planData),
    });
    setUser(response.data.user);
  }, []);

  const unsubscribe = useCallback(async () => {
    const response = await apiCall<ApiResponse<AuthResponse>>("/auth/unsubscribe", {
      method: "POST",
    });
    setUser(response.data.user);
  }, []);

  const getPlans = useCallback(async (): Promise<Plan[]> => {
    const response = await apiCall<ApiResponse<Plan[]>>("/auth/plans");
    return response.data;
  }, []);

  const checkAuthStatus = useCallback(async () => {
    if (!tokens) return;
    
    try {
      await apiCall("/auth/status");
    } catch {
      await logout();
    }
  }, [tokens]);

  useEffect(() => {
    const initAuth = async () => {
      const storedTokens = localStorage.getItem("tokens");
      if (storedTokens) {
        try {
          const parsedTokens = JSON.parse(storedTokens);
          setTokens(parsedTokens);
          await getCurrentUser();
        } catch {
          localStorage.removeItem("tokens");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (tokens?.accessToken) {
      getCurrentUser();
    }
  }, [tokens?.accessToken]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      error,
      login,
      register,
      logout,
      refreshToken,
      getCurrentUser,
      subscribe,
      unsubscribe,
      getPlans,
      checkAuthStatus,
      tokens,
    }}>
      {children}
    </AuthContext.Provider>
  );
};