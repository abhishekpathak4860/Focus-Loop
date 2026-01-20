import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include 'user'
export interface AuthRequest extends Request {
  user?: {
    userId: number;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  // 1. Get Token from Header (Format: "Bearer <token>")
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get the part after "Bearer"

  if (!token) {
    res.status(401).json({ message: "Access Token Required" });
    return;
  }

  // 2. Verify Token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
      }

      // 3. Attach User ID to Request Object
      req.user = user;

      // 4. Move to the next function (The Controller)
      next();
    },
  );
};
