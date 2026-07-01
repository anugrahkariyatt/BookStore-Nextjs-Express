"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, User, Mail, Shield, Save, Key } from "lucide-react";
import api from "../api/axios";
// import { successToast, errorToast } from "../../utils/Toast";
import {
  object,
  string,
  email,
  minLength,
  pipe,
  safeParse,
  regex,
  trim,
} from "valibot";

// --- Validation Schemas ---
const profileSchema = object({
  name: pipe(
    string(),
    trim(),
    minLength(3, "Name must be at least 3 characters"),
  ),
  email: pipe(string(), trim(), email("Please enter a valid email address")),
});

const currentPasswordSchema = object({
  currentPassword: pipe(
    string(),
    trim(),
    minLength(1, "Current password is required"),
  ),
});

const passwordSchema = object({
  currentPassword: pipe(string(), minLength(1, "Current password is required")),
  password: pipe(
    string(),
    minLength(8, "Password must be at least 8 characters"),
    regex(/[A-Z]/, "Must contain at least one uppercase letter"),
    regex(/[0-9]/, "Must contain at least one number"),
    regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  ),
  confirmPassword: pipe(string(), minLength(8, "Confirm password is required")),
});

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data.user);
        setFormData((prev) => ({
          ...prev,
          name: res.data.user.name,
          email: res.data.user.email,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = safeParse(profileSchema, {
      name: formData.name,
      email: formData.email,
    });
    if (!result.success) {
      const fieldErrors: any = {};
      result.issues.forEach((issue) => {
        fieldErrors[issue.path?.[0]?.key as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      await api.put("/profile/update", {
        name: formData.name,
        email: formData.email,
      });
      // successToast("Admin profile updated successfully!");
    } catch {
      // errorToast("Failed to update profile");
    }
  };

  const handleVerifyPassword = async () => {
    const result = safeParse(currentPasswordSchema, {
      currentPassword: formData.currentPassword,
    });
    if (!result.success) {
      setErrors({ currentPassword: result.issues[0].message });
      return;
    }
    setIsVerifying(true);
    try {
      await api.post("/profile/verify-password", {
        currentPassword: formData.currentPassword,
      });
      setIsPasswordVerified(true);
      // successToast("Password verified!");
    } catch (err: any) {
      // errorToast(err.response?.data?.error || "Incorrect password");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdatePassword = async () => {
    const result = safeParse(passwordSchema, {
      currentPassword: formData.currentPassword,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    if (!result.success) {
      const fieldErrors: any = {};
      result.issues.forEach((issue) => {
        fieldErrors[issue.path?.[0]?.key as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    try {
      await api.put("/profile/update-password", {
        newPassword: formData.password,
      });
      // successToast("Password changed successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }));
      setIsPasswordVerified(false);
    } catch {
      // errorToast("Failed to update password");
    }
  };

  if (!user)
    return (
      <div className="p-10 text-center animate-pulse">Loading profile...</div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-primary">User Profile</h2>
        <p className="text-secondary opacity-70">
          Manage your account settings and security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="rounded-3xl bg-white shadow-xl border border-[#F3E9D7] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-[#C42A25] h-28 relative">
            <div className="absolute -bottom-10 left-8">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=ffffff&color=AD1B18&size=120`}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                alt="Profile"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-14 px-8 pb-8">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

            <p className="text-gray-500 mt-1">{user.email}</p>

            <div className="mt-6 border-t pt-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button className="w-full bg-primary hover:bg-[#971613] transition text-white rounded-xl py-3 font-semibold shadow-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-3xl bg-white shadow-xl border border-[#F3E9D7] overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-[#F3E9D7] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Key className="text-primary" size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">Security</h2>

              <p className="text-sm text-gray-500">
                Change your account password securely.
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Current Password */}

            <div className="relative">
              <label className="text-sm font-semibold text-gray-700">
                Current Password
              </label>

              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                disabled={isPasswordVerified}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 pr-12 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-4 top-[44px] text-gray-500 hover:text-primary"
              >
                {showPassword.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="text-sm text-red-500">{errors.currentPassword}</p>
            )}

            {!isPasswordVerified ? (
              <button
                onClick={handleVerifyPassword}
                className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90"
              >
                {isVerifying ? "Verifying..." : "Verify Password"}
              </button>
            ) : (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 flex items-center gap-3">
                <Shield className="text-green-600" size={20} />

                <div>
                  <p className="font-semibold text-green-700">
                    Password Verified
                  </p>

                  <p className="text-sm text-green-600">
                    You can now create a new password.
                  </p>
                </div>
              </div>
            )}

            {isPasswordVerified && (
              <>
                {/* New Password */}

                <div className="relative">
                  <label className="text-sm font-semibold text-gray-700">
                    New Password
                  </label>

                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 pr-12 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="absolute right-4 top-[44px] text-gray-500 hover:text-primary"
                  >
                    {showPassword.new ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {/* Confirm Password */}

                <div className="relative">
                  <label className="text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>

                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-[#FCFAF6] px-4 py-3 pr-12 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute right-4 top-[44px] text-gray-500 hover:text-primary"
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}

                <button
                  onClick={handleUpdatePassword}
                  className="w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
                >
                  Update Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
