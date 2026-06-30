import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import { checkAuthenticatedUsers } from "../middlewares/checkAuthenticatedUsers.js";
import { createRoommateOpening } from "../controllers/roommate_controllers/createroommate.controller.js";
import { updateRoommateOpening } from "../controllers/roommate_controllers/updateroommate.controller.js";
import { deleteRoommateOpening } from "../controllers/roommate_controllers/deleteroommate.controller.js";
import {
  getAllRoommateOpenings,
  getSingleRoommateOpening,
  getMyRoommateOpenings,
} from "../controllers/roommate_controllers/getroommate.controller.js";

const router = Router();

router.get("/my-openings", checkAuthenticatedUsers, getMyRoommateOpenings);
router.get("/", getAllRoommateOpenings);
router.get("/:id", getSingleRoommateOpening);

router.post(
  "/",
  checkAuthenticatedUsers,
  upload.single("roommateOpeningImage"),
  createRoommateOpening
);

router.put(
  "/:id",
  checkAuthenticatedUsers,
  upload.single("roommateOpeningImage"),
  updateRoommateOpening
);

router.delete("/:id", checkAuthenticatedUsers, deleteRoommateOpening);

export default router;
