import { db } from "../../db/index.js";
import { users } from "../../db/schemas/userSchema.js";
import { eq } from "drizzle-orm";

export const verifyUser = async (req, res) => {
  const { userId, action } = req.body;

  if (!["accepted", "rejected"].includes(action)) {
    return res.status(400).json({ message: "You cannot proceed further" });
  }

  try {
    await db.update(users).set({ status: action }).where(eq(users.id, userId));
    // Fixed: changed .send(200).json to .status(200).json
    res.status(200).json({ message: `User status updated to ${action}` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};