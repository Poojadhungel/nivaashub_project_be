import { db } from "../../db/index.js";
import { and, eq } from "drizzle-orm";
import { properties } from "../../db/schema.js";
import fs from "fs";

export const deleteProperty = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id);
    const userId = req.user?.id;


    const [existing] = await db
      .select()
      .from(properties)
      .where(
        and(
          eq(properties.id, propertyId),
          eq(properties.ownerId, userId)
        )
      );

    if (!existing) {
      return res
        .status(404)
        .json({ message: "Could not find the property with this id" });
    }

    await db.delete(properties).where(eq(properties.id, propertyId));

    if (existing.imageUrl && fs.existsSync(existing.imageUrl)) {
      fs.unlinkSync(existing.imageUrl);
    }

    res.status(200).json({ message: `Property deleted successfully` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};