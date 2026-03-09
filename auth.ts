import jwt from "jsonwebtoken";
import { createHash, randomBytes, pbkdf2Sync } from "crypto";
import type { Request, Response, NextFunction } from "express";

// JWT Secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || "diabetes-platform-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

// Password hashing
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  const verifyHash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return hash === verifyHash;
}

// JWT token generation
export function generateToken(userId: number, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): { userId: number; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Auth middleware
export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  req.user = decoded;
  next();
}

// Optional auth middleware (doesn't fail if no token)
export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }

  next();
}

// Medical disclaimer version
export const MEDICAL_DISCLAIMER_VERSION = "1.0.0";
export const MEDICAL_DISCLAIMER_TEXT = `
⚠️ IMPORTANT MEDICAL DISCLAIMER
• This tool provides an AI-based risk SCREENING only – NOT a medical diagnosis
• Results are from a machine learning model trained on PIMA Indian demographics
• ALWAYS consult a healthcare provider for confirmation and treatment decisions
• Especially seek clinical care if you experience symptoms: thirst, fatigue, frequent urination
• This tool is not a substitute for medical examination or lab tests (HbA1c, fasting glucose)
• If your risk is "High" or "Very High", schedule an appointment with your doctor immediately
`.trim();

// Compliance wrapper for responses
export function addComplianceMetadata(data: any) {
  return {
    ...data,
    metadata: {
      generatedAt: new Date().toISOString(),
      disclaimerVersion: MEDICAL_DISCLAIMER_VERSION,
      source: "DiaRisk AI Platform",
    },
  };
}

// Sanitize sensitive data for logging
export function sanitizeForLog(data: any): any {
  const sensitiveFields = ["password", "password_hash", "access_token", "refresh_token", "token"];
  const sanitized = { ...data };

  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = "[REDACTED]";
    }
  }

  return sanitized;
}
