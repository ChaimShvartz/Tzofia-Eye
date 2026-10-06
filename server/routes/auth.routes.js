import { Router } from "express";
import {
    getUser,
    getUsers,
    register,
    login,
    deleteUser,
} from "../ctrls/users.ctrl.js";

const router = Router();

router.get("/users", getUsers);
router.get("/me", getUser);
router.post("/register", register);
router.post("/login", login);
router.delete("/users/:id", deleteUser);

export default router;
