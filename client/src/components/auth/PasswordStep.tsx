"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/auth/authThunk";

export default function PasswordStep({ email, userName, setStep }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      setLoading(true);

      const result = await dispatch(
        loginUser({
          email,
          password,
        })
      );

      if (loginUser.fulfilled.match(result)) {
        router.push("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message ?? "Invalid email or password.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => setStep("email")}
          className="mb-5 flex items-center gap-2 text-sm text-muted hover:text-text transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-3xl font-bold text-text">Welcome Back</h2>

        <p className="mt-2 text-muted">
          Hi <span className="font-semibold text-text">{userName}</span>, enter your
          password to continue.
        </p>

        <p className="mt-1 text-sm text-muted/70">{email}</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-text">Password</label>

        <div className="flex items-center rounded-xl border border-border px-4 focus-within:border-primary transition">
          <Lock className="text-muted" size={18} />

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter your password"
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
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}