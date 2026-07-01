"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import api from "@/app/api/axios";

import { string, trim, email, pipe, safeParse } from "valibot";

const emailSchema = pipe(
  string(),
  trim(),
  email("Please enter a valid email address")
);

export default function EmailStep({ email: emailVal, setEmail, setUserName, setStep }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();

    const result = safeParse(emailSchema, emailVal);

    if (!result.success) {
      setError(result.issues[0].message);
      return;
    }

    setError("");

    try {
      setLoading(true);

      const res = await api.post("/check-email", {
        email: emailVal,
      });

      if (res.data.exists) {
        setUserName(res.data.name);
        setStep("password");
      } else {
        router.push("/signup");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleContinue} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-text">Welcome Back</h2>
        <p className="mt-2 text-muted">Enter your email to continue.</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-text">Email Address</label>

        <div className="flex items-center rounded-xl border border-border px-4 focus-within:border-primary transition">
          <Mail className="text-muted" size={18} />
          <input
            type="email"
            value={emailVal}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter your email"
            className="w-full rounded-xl px-3 py-3 outline-none bg-transparent"
          />
        </div>

        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Checking..." : "Continue"}
      </button>

      <p className="text-center text-sm text-muted">
        Don't have an account?
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="ml-2 font-semibold text-primary hover:underline"
        >
          Create Account
        </button>
      </p>
    </form>
  );
}