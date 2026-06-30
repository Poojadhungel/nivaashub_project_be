import { db } from "../../db/index.js";
import { roommate } from "../../db/schema.js";
import fs from "fs";
import path from "path";

export const createRoommateOpening = async (req, res) => {
    let photoPath = null;
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required." });
        }

        // Note: Kept your logic, but changed the message to be more accurate
        if (req.user?.status !== "accepted") {
            return res.status(403).json({ message: "Your account is pending admin approval." });
        }

        const folder = "uploads/roommates";
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        const fileName = `${Date.now()}-${path.extname(req.file.originalname)}`;
        photoPath = path.join(folder, fileName);
        fs.writeFileSync(photoPath, req.file.buffer);

        const {
            title,
            description,
            price,
            address,
            longitude,
            latitude,
            beds,
            baths,
            occupation,
            age,
            gender,
            faculty,
            education,
            isSmoker,
            hasPets,
            prefGender,
            prefMinAge,
            prefMaxAge,
        } = req.body;

        await db.insert(roommate).values({
            ownerId: req.user.id,
            title,
            description,
            address,
            longitude,
            latitude,
            price: price,
            beds: parseInt(beds),
            baths: parseInt(baths),
            imageUrl: photoPath,
            occupation,
            age: parseInt(age),
            gender,
            faculty,
            education,
            isSmoker: isSmoker === "true",
            hasPets: hasPets === "true",
            prefGender,
            prefMinAge: parseInt(prefMinAge),
            prefMaxAge: parseInt(prefMaxAge),
        });

        res.status(201).json({ message: "Roommate vacancy created successfully." });
    } catch (e) {
        // Cleanup file if DB insert fails
        if (photoPath && fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath);
        }
        console.error("CREATE ROOMMATE ERROR:", e);
        res.status(500).json({ message: "Internal server error" });
    }
};