"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import api from "@/app/api/axios";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/signup", formData);
      router.push("/"); 
    } catch (err) {
      console.error("Signup failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-red-900 to-black p-6">
      {/* Decorative Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent opacity-5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-white opacity-5 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-lg z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Join <span className="text-accent">StoryVerse</span>
          </h1>
          <p className="text-white/60 mt-2">
            Start your reading adventure today.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="text-sm font-medium text-text mb-1.5 block">
                Full Name
              </label>
              <div className="flex items-center rounded-xl border border-border px-4 bg-background/50">
                <User className="text-muted" size={18} />
                <input
                  type="text"
                  className="w-full px-3 py-3 bg-transparent outline-none"
                  placeholder="John Doe"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="text-sm font-medium text-text mb-1.5 block">
                Email Address
              </label>
              <div className="flex items-center rounded-xl border border-border px-4 bg-background/50">
                <Mail className="text-muted" size={18} />
                <input
                  type="email"
                  className="w-full px-3 py-3 bg-transparent outline-none"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm font-medium text-text mb-1.5 block">
                Password
              </label>
              <div className="flex items-center rounded-xl border border-border px-4 bg-background/50">
                <Lock className="text-muted" size={18} />
                <input
                  type="password"
                  className="w-full px-3 py-3 bg-transparent outline-none"
                  placeholder="Create a password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
            >
              {loading ? "Creating..." : "Create Account"}{" "}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?
            <button
              onClick={() => router.push("/login")}
              className="ml-1.5 font-semibold text-primary hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
