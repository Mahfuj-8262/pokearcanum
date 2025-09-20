"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  refreshAccessToken,
} from "@/lib/api";

type User = {
  id: string;
  email: string;
  userName: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (accessToken: string) => {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));

    return {
      id:
        payload.nameid ||
        payload.sub ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      email:
        payload.email ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      userName:
        payload.name ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
        "",
    };
  };

  useEffect(() => {
    const initAuth = async () => {
      const restored = await refreshAccessToken();
      if (restored) {
        const { accessToken } = restored;
        const decoded = decodeToken(accessToken);
        setUser(decoded);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const tokens = await apiLogin(email, password);
    const decoded = decodeToken(tokens.accessToken);
    setUser(decoded);
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    await apiRegister(username, email, password);
    await handleLogin(email, password);
  };

  const handleLogout = () => {
    apiLogout();
    setUser(null);
    // optional: redirect
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};


// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   login as apiLogin,
//   register as apiRegister,
//   logout as apiLogout,
//   refreshAccessToken,
// } from "@/lib/api";

// type User = {
//   id: string;
//   email: string;
//   userName: string;
// } | null;

// type AuthContextType = {
//   user: User;
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (username: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User>(null);
//   const [loading, setLoading] = useState(true);

//   // Auto-restore session on app load
//   useEffect(() => {
//     const initAuth = async () => {
//       const restored = await refreshAccessToken();
//       if (restored) {
//         const { accessToken } = restored;
//         const payload = JSON.parse(atob(accessToken.split(".")[1]));
//         setUser({
//           id: payload.nameid || payload.sub,
//           email: payload.email,
//           userName: payload.name,
//         });
//       }
//       setLoading(false);
//     };
//     initAuth();
//   }, []);

//   const handleLogin = async (email: string, password: string) => {
//     const tokens = await apiLogin(email, password);
//     const payload = JSON.parse(atob(tokens.accessToken.split(".")[1]));
//     setUser({
//       id: payload.nameid || payload.sub,
//       email: payload.email,
//       userName: payload.name,
//     });
//   };

//   const handleRegister = async (username: string, email: string, password: string) => {
//     await apiRegister(username, email, password);
//     // Optional: auto login after registration
//     await handleLogin(email, password);
//   };

//   const handleLogout = () => {
//     apiLogout();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         loading,
//         login: handleLogin,
//         register: handleRegister,
//         logout: handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook for components
// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };