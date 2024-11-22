// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  role: string | null;
  login: (token: string, userId: string, role: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  console.log(token);


  const login = (token: string, userId: string, role: string) => {
    setToken(token);
    setUserId(userId);
    setRole(role);
    console.log("Usuário logado:", { token, userId, role });
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
