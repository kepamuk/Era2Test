import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface AuthContextType {
  isAuthed: boolean;
  userName: string;
  credits: number;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthed: false,
  userName: "",
  credits: 1000,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("era2_auth") === "true";
    }
    return false;
  });
  const [userName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("era2_user") || "Пользователь";
    }
    return "Пользователь";
  });

  const login = useCallback(() => {
    localStorage.setItem("era2_auth", "true");
    localStorage.setItem("era2_user", "Пользователь");
    setIsAuthed(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("era2_auth");
    localStorage.removeItem("era2_user");
    setIsAuthed(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, userName, credits: 1000, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
