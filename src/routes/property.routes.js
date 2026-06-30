import { Router } from "express";

import { upload } from "../middlewares/upload.js";
import { checkAuthenticatedUsers } from "../middlewares/checkAuthenticatedUsers.js";
import {
    getAllProperties,
    getSingleProperty,
    getUserProperties,
} from "../controllers/property_controllers/getproperty.controller.js";
import { createProperty } from "../controllers/property_controllers/createproperty.controller.js";
import { updateProperty } from "../controllers/property_controllers/updateproperty.controller.js";
import { deleteProperty } from "../controllers/property_controllers/deleteproperty.controller.js";

const router = Router();

router.get("/", getAllProperties);
router.get("/my-properties", checkAuthenticatedUsers, getUserProperties);
router.get("/:id", getSingleProperty);

router.post(
    "/",
    checkAuthenticatedUsers,
    upload.single("propertyImage"),
    createProperty
);

router.put(
    "/:id",
    checkAuthenticatedUsers,
    upload.single("propertyImage"),
    updateProperty
);

router.delete("/:id", checkAuthenticatedUsers, deleteProperty);

export default router;