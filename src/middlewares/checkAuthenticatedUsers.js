import jwt from "jsonwebtoken";
import "dotenv/config";
import { db } from "../db/index.js";
import { users } from "../db/schemas/userSchema.js";
import { eq } from "drizzle-orm";

export const checkAuthenticatedUsers = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id));

    if (!user) {
      return res.status(404).json({ message: "User no longer exists." });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};