"use client";

import { useState } from "react";
import EmailStep from "@/components/auth/EmailStep";
import PasswordStep from "@/components/auth/PasswordStep";

export default function LoginPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <div className="hidden w-1/2 items-center justify-center bg-primary lg:flex">
          <div className="max-w-md px-10 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to
              <span className="block text-accent">StoryVerse</span>
            </h1>

            <p className="mt-6 text-lg text-white/90">
              Discover thousands of books from your favourite authors. Manage
              your orders, wishlist and reading journey in one place.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl bg-surface p-8 border border-border shadow-2xl">
            {step === "email" ? (
              <EmailStep
                email={email}
                setEmail={setEmail}
                setUserName={setUserName}
                setStep={setStep}
              />
            ) : (
              <PasswordStep
                email={email}
                userName={userName}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}