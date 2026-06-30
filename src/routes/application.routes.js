import { Router } from "express";
import { checkAuthenticatedUsers } from "../middlewares/checkAuthenticatedUsers.js";
import {
    applyForProperty,
    applyForRoommate,
} from "../controllers/application_controllers/application.controller.js";

const router = Router();

router.use(checkAuthenticatedUsers);

router.post("/property", applyForProperty);
router.post("/roommate", applyForRoommate);

export default router;