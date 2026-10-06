import { Router } from "express";
import {
    getUser,
    getUsers,
    register,
    login,
    deleteUser,
} from "../ctrls/users.ctrl.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/users", auth, getUsers);
router.get("/me", auth, getUser);
router.post("/register", auth, register);
router.post("/login", login);
router.delete("/users/:id", auth, deleteUser);

export default router;
