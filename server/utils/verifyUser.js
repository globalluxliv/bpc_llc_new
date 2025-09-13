import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.access_token ||
    (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

  if (!token) return next(errorHandler(401, "Not signed in"));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch {
    next(errorHandler(401, "Invalid token"));
  }
};
