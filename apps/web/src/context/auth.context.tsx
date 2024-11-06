'use client';
import React, { useContext, useState, useEffect, createContext, ReactNode } from 'react';
import { User, AuthContextProps } from '@/utils/type';
import axiosInstance from '@/helper/axios';
import { removeTokenFromCookies } from '@/app/action/storeToken';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const fetchProfileOnce = async (token: string) => {
  try {
    if(!token) {
      return;
    }
    const res = await axiosInstance.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      throw new Error('Failed to fetch user profile');
    }

    const userProfile = res.data;
    return userProfile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};


export function AuthProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken: string;
}) {
  const [user, setUser] = useState<User | null>(null); 
  const [token, setToken] = useState(initialToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);

  useEffect(() => {
    if (token) {
      fetchProfileOnce(token).then(profile => {
        if (profile) {
          setUser(profile);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          // removeTokenFromCookies();
        }
      });
    }
  }, [token]);

  const handleSetToken = (value: string) => {
    setToken(value);
    if (!value) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken('');
    setIsLoggedIn(false);
    removeTokenFromCookies();
  };
  
  return (
    <AuthContext.Provider value={{ user, setToken: handleSetToken, token, isLoggedIn, logout, setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
