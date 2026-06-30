import { db } from "../../db/index.js";
import { properties } from "../../db/schema.js";
import fs from "fs";
import path from "path";

export const createProperty = async (req, res) => {
  let propertyPath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Property image is needed." });
    }

    const ownerId = req.user?.id;
    const userStatus = req.user?.status;

    if (!ownerId) {
      return res
        .status(401)
        .json({ message: "You need to sign in to add a property." });
    }

    if (userStatus !== "accepted") {
      return res.status(403).json({
        message: "Please wait, your account is pending admin approval.",
      });
    }

    const {
      title,
      description,
      price,
      address,
      beds,
      baths,
      type,
      latitude,
      longitude,
    } = req.body;

    const folder = "uploads/properties";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const propertyName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(req.file.originalname)}`;
    propertyPath = path.join(folder, propertyName);

    fs.writeFileSync(propertyPath, req.file.buffer);

    await db.transaction(async (tx) => {
      // Removed the [newProp] assignment since it wasn't being used
      await tx.insert(properties).values({
        ownerId,
        title,
        description,
        price,
        address,
        beds: parseInt(beds),
        baths: parseInt(baths),
        type,
        latitude,
        longitude,
        imageUrl: propertyPath, // Removed "!" non-null assertion
      });
    });

    res.status(201).json({ message: "Property added successfully." });
  } catch (e) {
    if (propertyPath && fs.existsSync(propertyPath)) {
      fs.unlinkSync(propertyPath);
    }

    console.error("Creation Error:", e);
    res.status(400).json({
      message: "Could not create property.",
      error: e.message,
    });
  }
};