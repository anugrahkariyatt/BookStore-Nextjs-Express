import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/hashpassword.utils.js";
import generateToken from "../utils/generateJwtToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.utils.js";
import { hashRefreshToken, compareRefreshToken } from "../utils/token.utils.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      role: "user",
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked.",
      });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const session = await Session.create({
      userId: user._id,
      refreshTokenHash: "",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = generateRefreshToken(session);

    const refreshTokenHash = await hashRefreshToken(refreshToken);

    session.refreshTokenHash = refreshTokenHash;
    await session.save();

    const accessToken = generateAccessToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      user: userResponse,
      accessToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );

        await Session.findByIdAndDelete(decoded.sessionId);
      } catch (err) {
      }
    }
  } finally {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("Error", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
};
export const me = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.userId;

    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email is already in use by another account" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const verifyPassword = async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await comparePassword(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    res.status(200).json({ message: "Password verified successfully" });
  } catch (error) {
    console.error("Verify password error:", error);
    res.status(500).json({ error: "Failed to verify password" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.userId;

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const emailCheck = async (req, res) => {
  const email = req.body.email;
  try {
    const isEmail = await User.findOne({ email: email });
    if (isEmail) {
      return res.status(200).json({ message: "Email Exist", exists: true });
    } else {
      return res
        .status(400)
        .json({ message: "Email dose not  exist", exists: false });
    }
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const session = await Session.findById(decoded.sessionId);

    if (!session) {
      return res.status(401).json({
        message: "Session not found",
      });
    }

    if (session.expiresAt < new Date()) {
      return res.status(401).json({
        message: "Session expired",
      });
    }

    const isValid = await compareRefreshToken(
      refreshToken,
      session.refreshTokenHash,
    );

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const user = await User.findById(session.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.isBlocked) {
      await Session.findByIdAndDelete(session._id);

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return res.status(403).json({
        message: "Your account has been blocked.",
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};
