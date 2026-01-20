import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { VerifyErrors } from "jsonwebtoken";

// Helper to generate tokens
const generateTokens = (userId: number) => {
  // Access Token: Short life (e.g., 15 mins) - Used for API calls
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken };
};

// --- REGISTER CONTROLLER ---
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User in Database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // 4. Generate Tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // 5. Send Refresh Token in HTTP-Only Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax",
      path: "/",
    });

    // 6. Respond with Success
    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// --- LOGIN CONTROLLER ---
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Find User by Email
    const user = await prisma.user.findUnique({ where: { email } });

    // Agar user nahi mila, toh error do
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" }); // Security ke liye "User not found" nahi bolte
      return;
    }

    // 2. Compare Password (Jo user ne dala vs Jo DB mein hashed hai)
    const isMatch = await bcrypt.compare(password, user.password);

    // Agar password galat hai, toh error do
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // 3. Generate New Tokens (Yahan tokens create honge)
    const { accessToken, refreshToken } = generateTokens(user.id);

    // 4. Set Refresh Token in HTTP-Only Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Production mein https zaroori hai
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax",
      path: "/",
    });

    // 5. Respond with Success & Access Token
    res.json({
      message: "Login successful",
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// --- REFRESH TOKEN CONTROLLER ---
export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // 1. Get the Refresh Token from the Cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "No refresh token found" });
      return;
    }

    // 2. Verify the Refresh Token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          // If cookie is invalid or expired
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        // 3. If valid, generate a NEW Access Token
        // Note: We don't generate a new Refresh Token (it lasts 7 days)
        const accessToken = jwt.sign(
          { userId: decoded.userId }, // Keep the same User ID
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" },
        );

        // 4. Send the new Access Token to Frontend
        res.json({ accessToken });
      },
    );
  } catch (error) {
    console.error("Refresh Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- LOGOUT CONTROLLER ---
export const logout = (req: Request, res: Response): void => {
  try {
    // Clear the Refresh Token Cookie
    // IMPORTANT: The options (httpOnly, secure) must match exactly what you used when creating it!
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};
