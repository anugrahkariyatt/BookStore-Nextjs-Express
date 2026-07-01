import { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import api from "./axios";
import { store } from "@/redux/store";
import { setAccessToken, logout } from "@/redux/auth/authSlice";
import { setAuthTokenHeader } from "./axios";

let isRefreshing = false;
type QueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let failedQueue: QueueItem[] = [];
let interceptorsSetup = false;

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

export const setupInterceptors = () => {
  if (interceptorsSetup) {
    return;
  }

  interceptorsSetup = true;

  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.accessToken;

      const publicRoutes = ["/login", "/signup", "/check-email", "/refresh"];

      if (token && config.url && !publicRoutes.includes(config.url)) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;
      const publicRoutes = ["/login", "/signup", "/check-email", "/refresh"];

      if (originalRequest?.url && publicRoutes.includes(originalRequest.url)) {
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return api(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await api.post("/refresh");

          const newAccessToken = res.data.accessToken;

          store.dispatch(setAccessToken(newAccessToken));
          setAuthTokenHeader(newAccessToken);

          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);

          store.dispatch(logout());
          setAuthTokenHeader(null);

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
