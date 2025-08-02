import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";
import type LoginDto from "../dto/login.dto";
import type ReqResDto from "../dto/authRes.dto";
import { authenticatedFetch } from "../utils/requests/api";

interface AuthContextType {
  isAuthed: boolean;
  login: (credentials: LoginDto) => Promise<ReqResDto>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [adminOptions, setAdminOptions] = useState<number[] | null>(null)
  const [isLoading, setIsLoading] = useState(true); // To show a loader on initial check

  // On mount, check if we have a valid session by trying to refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      const result = await authService.refresh();
      setIsAuthed(result.ok);
      setIsLoading(false);
    };
    checkAuthStatus();

    // Listen for the custom event from our authenticatedFetch
    const handleAuthFailure = () => {
        setIsAuthed(false);
    }

    window.addEventListener('auth-failed', handleAuthFailure);

    // Cleanup listener on unmount
    return () => {
        window.removeEventListener('auth-failed', handleAuthFailure);
    }
  }, []);

  const login = async (credentials: LoginDto) => {
    setIsLoading(true);
    const result = await authService.login(credentials);
    setIsAuthed(result.ok);
    setIsLoading(false);
    return result;
  };

  const logout = () => {
    setIsAuthed(false);
  };

  const value = { isAuthed, login, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// The final custom hook that components will use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}