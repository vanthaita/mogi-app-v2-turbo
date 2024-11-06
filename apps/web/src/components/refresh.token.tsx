'use client';

import { setTokenFromCookies } from '@/app/action/storeToken';
import { useAuth } from '@/context/auth.context';
import axiosInstance from '@/helper/axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface JwtPayload {
  exp: number;
  [key: string]: any; 
}

interface TokenResponse {
  access_token: string;
}

const isJwtPayload = (payload: any): payload is JwtPayload => {
  return typeof payload === 'object' && 'exp' in payload;
};

const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);

    return isJwtPayload(payload) ? payload : null;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
};

const isTokenExpiringSoon = (token: string | null, threshold: number = 10 * 60 * 1000): boolean => {
  if (!token) return false;

  const payload = decodeJwt(token);
  if (!payload) return false;

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();

  return expirationTime - currentTime < threshold;
};

const RefreshToken = (): null => {
  const { token, logout, setToken } = useAuth();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<void>('/auth/logout');
      if (response.status === 200) {
        await logout();
        router.push('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Failed to log out:', error);
      await logout();
      router.push('/sign-in');
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<TokenResponse>('/auth/check-token');
      if (response.status === 200 && response.data?.access_token) {
        setToken(response.data.access_token);
        setTokenFromCookies(response.data.access_token);
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      handleLogout();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTokenExpiringSoon(token)) {
        refreshAccessToken();
      }
    }, 5 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, [token]);

  return null;
};

export default RefreshToken;
