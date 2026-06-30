import { Router } from "express";
import { register } from "../controllers/auth_controllers/auth.controller.js";
import { login } from "../controllers/auth_controllers/login.controller.js";
import { upload } from "../middlewares/upload.js";
import { checkAuthenticatedUsers } from "../middlewares/checkAuthenticatedUsers.js";

const router = Router();

router.post("/register", upload.single("idCard"), register);
router.post("/login", login);

router.get(
    "/user",
    checkAuthenticatedUsers,
    (req, res) => {
        res.json({
            message: "This is the user's private route",
            email: req.user?.email,
        });
    }
);

export default router;