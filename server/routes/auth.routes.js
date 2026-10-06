import { Router } from "express";
import {
    getUser,
    getUsers,
    register,
    login,
    deleteUser,
} from "../ctrls/users.ctrl.js";
import { auth } from "../middlewares/auth.js";
import { checkAccess } from "../middlewares/checkAccess.js";
import { validation } from "../middlewares/validation.js";
import { User } from "../models/user.model.js";

const router = Router();

router.get("/users", auth, checkAccess("admin"), getUsers);
router.get("/me", auth, getUser);
router.post(
    "/register",
    auth,
    checkAccess("admin"),
    validation(User),
    register,
);
router.post("/login", login);
router.delete("/users/:id", auth, checkAccess("admin"), deleteUser);

export default router;
