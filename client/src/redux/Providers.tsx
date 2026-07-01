"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { setupInterceptors } from "@/app/api/interceptors";
import AuthInitializer from "./AuthInitializer";

setupInterceptors();

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [authReady, setAuthReady] = useState(false);

  return (
    <Provider store={store}>
      <AuthInitializer onReady={() => setAuthReady(true)} />

      {!authReady ? (
        <div className="flex min-h-screen items-center justify-center bg-background text-text">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted">Preparing your session...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </Provider>
  );
}
