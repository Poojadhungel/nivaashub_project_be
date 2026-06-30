import { Router } from "express";
import { checkAuthenticatedUsers } from "../middlewares/checkAuthenticatedUsers.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import {
    getPendingVerifications,
    updateUserStatus,
    getPropertyApplications,
    getRoommateApplications,
} from "../controllers/admin_controller/admin.controller.js";

const router = Router();

router.use(checkAuthenticatedUsers);
router.use(checkAdmin);

router.get("/users", getPendingVerifications);
router.put("/users/verify/:id", updateUserStatus);

router.get("/property-apps", getPropertyApplications);
router.get("/roommate-apps", getRoommateApplications);

export default router;