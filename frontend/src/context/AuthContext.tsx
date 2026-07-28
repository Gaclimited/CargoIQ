import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { loginRequest, registerRequest } from "../api/auth.api";
import {
  getToken,
  setToken,
  getStoredUser,
  setStoredUser,
  clearAuthStorage,
} from "../utils/tokenStorage";
import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";
import type { NormalizedApiError } from "../types/api.types";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (body: LoginRequest) => Promise<void>;
  register: (body: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Automatic token/user restoration on app load.
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser<AuthUser>();
    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUser(storedUser);
    }
    setIsInitializing(false);
  }, []);

  const login = useCallback(async (body: LoginRequest) => {
    try {
      const data = await loginRequest(body);
      setToken(data.token);
      setStoredUser(data.user);
      setTokenState(data.token);
      setUser(data.user);
    } catch (err) {
      throw err as NormalizedApiError;
    }
  }, []);

  const register = useCallback(async (body: RegisterRequest) => {
    try {
      const data = await registerRequest(body);
      setToken(data.token);
      setStoredUser(data.user);
      setTokenState(data.token);
      setUser(data.user);
    } catch (err) {
      throw err as NormalizedApiError;
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setTokenState(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        isInitializing,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
