import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default function userauth(req: Request, res: Response, next: NextFunction):any {
  const token = req.headers.authorization; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, "JWT_SECCRET"); // Replace with process.env.JWT_SECRET in prod
    //@ts-ignore
    req.user = decoded.userId;
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
