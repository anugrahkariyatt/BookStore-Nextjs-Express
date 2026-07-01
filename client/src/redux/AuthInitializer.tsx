"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import api from "@/app/api/axios";
import { fetchCurrentUser } from "@/redux/auth/authThunk";
import { setAccessToken, setInitialized } from "@/redux/auth/authSlice";
import type { AppDispatch } from "@/redux/store";
import { fetchCart } from "./cart/cartThunk";
import { setAuthTokenHeader } from "@/app/api/axios";

type AuthInitializerProps = {
  onReady?: () => void;
};

export default function AuthInitializer({ onReady }: AuthInitializerProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshResponse = await api.post("/refresh");

        const accessToken = refreshResponse.data.accessToken;

        dispatch(setAccessToken(accessToken));
        setAuthTokenHeader(accessToken);

        await dispatch(fetchCurrentUser());

        await dispatch(fetchCart());

        console.log("User restored");
      } catch {
        console.log("User not logged in");
        setAuthTokenHeader(null);
      } finally {
        dispatch(setInitialized());
        onReady?.();
      }
    };

    initializeAuth();
  }, [dispatch, onReady]);

  return null;
}
