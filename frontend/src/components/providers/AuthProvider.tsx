

// // frontend\src\components\providers\AuthProvider.tsx
// "use client";

// import { User } from "@/types";
// import Cookies from "js-cookie";
// import { useRouter, usePathname } from "next/navigation";
// import React, { createContext, useState, useEffect, ReactNode } from "react";

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (user: User, tokens: { access_token: string; refresh_token: string }) => void;
//   logout: () => void;
//   setUser: (user: User | null) => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const initializeAuth = () => {
//       const userCookie = Cookies.get("user");
//       const token = Cookies.get("access_token");

//       if (userCookie && token) {
//         try {
//           setUser(JSON.parse(userCookie));
//         } catch (error) {
//           console.error("Failed to parse user cookie:", error);
//           logout();
//         }
//       }
//       setIsLoading(false);
//     };
//     initializeAuth();
//   }, []);

//   const login = (userData: User, tokens: { access_token: string; refresh_token: string }) => {
//     Cookies.set("user", JSON.stringify(userData), { expires: 7 });
//     Cookies.set("access_token", tokens.access_token, { expires: 7 });
//     Cookies.set("refresh_token", tokens.refresh_token, { expires: 7 });
//     setUser(userData);
//     if (userData.role === 'super_admin') {
//       router.push("/dashboard/users");
//     } else {
//       // Redirect regular users to a different page if needed
//       router.push("/");
//     }
//   };

//   const logout = () => {
//     Cookies.remove("user");
//     Cookies.remove("access_token");
//     Cookies.remove("refresh_token");
//     setUser(null);
//     router.push("/login");
//   };

//   const isAuthenticated = !!user;

//   // Handle route protection
//   useEffect(() => {
//     if (!isLoading) {
//       const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/verify-otp');
//       const isDashboardPage = pathname.startsWith('/dashboard');

//       if (!isAuthenticated && !isAuthPage) {
//         router.push('/login');
//       }
//       if (isAuthenticated && isAuthPage) {
//         router.push(user?.role === 'super_admin' ? '/dashboard/users' : '/');
//       }
//       if (isAuthenticated && user?.role !== 'super_admin' && isDashboardPage) {
//         router.push('/'); // Or an access denied page
//       }
//     }
//   }, [isLoading, isAuthenticated, user, pathname, router]);

//   const value = { user, isAuthenticated, isLoading, login, logout, setUser };

//   if (isLoading) {
//     return <div>Loading...</div>; // Or a proper loading spinner component
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };










"use client";

import { User } from "@/types";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, tokens: { access_token: string; refresh_token: string }) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = () => {
      const userCookie = Cookies.get("user");
      const token = Cookies.get("access_token");

      if (userCookie && token) {
        try {
          setUser(JSON.parse(userCookie));
        } catch (error) {
          console.error("Failed to parse user cookie:", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = (userData: User, tokens: { access_token: string; refresh_token: string }) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    Cookies.set("access_token", tokens.access_token, { expires: 7 });
    Cookies.set("refresh_token", tokens.refresh_token, { expires: 7 });
    setUser(userData);
    if (userData.role === 'super_admin') {
      router.push("/dashboard/users");
    } else {
      router.push("/");
    }
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
    router.push("/");  // Changed: Redirect to home instead of /login
  };

  const isAuthenticated = !!user;

  // Handle route protection
  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/verify-otp');
      const isDashboardPage = pathname.startsWith('/dashboard');

      // Only protect dashboard for unauthenticated users (allow public access to /)
      if (!isAuthenticated && isDashboardPage) {
        router.push('/login');
      }

      // If authenticated and on auth pages, redirect to role-based home
      if (isAuthenticated && isAuthPage) {
        router.push(user?.role === 'super_admin' ? '/dashboard/users' : '/');
      }

      // If authenticated but not super_admin and on dashboard, redirect to /
      if (isAuthenticated && user?.role !== 'super_admin' && isDashboardPage) {
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  const value = { user, isAuthenticated, isLoading, login, logout, setUser };

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


