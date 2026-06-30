import { db } from "../../db/index.js";
import { desc, eq } from "drizzle-orm";
import { properties } from "../../db/schema.js";

export const getAllProperties = async (req, res) => {
  try {
    const data = await db.query.properties.findMany({
      orderBy: [desc(properties.id)],
    });
    res.json(data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "could not get all the properties", error: e.message });
  }
};

export const getSingleProperty = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id);

    if (isNaN(propertyId)) {
      return res // Added return here to stop execution
        .status(400) // Changed to 400 (Bad Request)
        .json({ message: "could not get property with the given ID." });
    }

    const data = await db.query.properties.findFirst({
      where: eq(properties.id, propertyId),
    });

    if (!data) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "could not get the property", error: e.message });
  }
};

export const getUserProperties = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Sign in, please" });
    }

    const myProperties = await db
      .select()
      .from(properties)
      .where(eq(properties.ownerId, userId));

    return res.json(myProperties);
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};