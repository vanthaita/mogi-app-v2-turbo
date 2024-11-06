import { getAccessToken } from '@/app/action/storeToken';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  // timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = await getAccessToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes globally
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized access - perhaps logout user
        console.log('Unauthorized, logging out...');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;