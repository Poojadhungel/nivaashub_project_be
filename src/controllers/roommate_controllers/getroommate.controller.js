import { db } from "../../db/index.js";
import { roommate } from "../../db/schema.js";
import { desc, eq } from "drizzle-orm";

export const getAllRoommateOpenings = async (req, res) => {
    try {
        const data = await db.query.roommate.findMany({
            orderBy: [desc(roommate.id)],
        });

        res.json(data);
    } catch (e) {
        res
            .status(500)
            .json({ message: "Could not fetch data.", error: e.message });
    }
};

export const getSingleRoommateOpening = async (req, res) => {
    try {
        const data = await db.query.roommate.findFirst({
            where: eq(roommate.id, parseInt(req.params.id)),
        });

        if (!data) {
            return res.status(404).json({ message: "Roommate vacancy not found." });
        }

        res.json(data);
    } catch (e) {
        res
            .status(500)
            .json({ message: "Could not fetch data.", error: e.message });
    }
};

export const getMyRoommateOpenings = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = await db
            .select()
            .from(roommate)
            .where(eq(roommate.ownerId, userId));
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};