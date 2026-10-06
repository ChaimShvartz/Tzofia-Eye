import db from "../db/db.js";
import { createUsersRepo } from "../repositories/users.repo.js";
import {
    comparePassword,
    generateToken,
    hashPassword,
} from "../services/auth.services.js";

const collection = db.collection("users");
const usersRepo = createUsersRepo(collection);

export const getUsers = async (
    /**@type {Request} */ _req,
    /**@type {Response} */ res,
) => {
    const users = await usersRepo.getUsers();
    const usersForClient = users.map(({ password, ...rest }) => rest);
    res.json({ success: true, data: usersForClient });
};
export const getUser = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.user;
    const user = await usersRepo.getUser({ id });
    if (!user)
        throw Object.assign(new Error(), {
            status: 404,
            message: "User not found",
        });
    const { password, ...userForClient } = user;
    res.json({ success: true, data: userForClient });
};

export const register = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { password, ...user } = req.body;
    const { username, email } = user;
    let duplicate =
        (await usersRepo.getUser({ username })) ||
        (await usersRepo.getUser({ email }));
    if (duplicate)
        throw Object.assign(new Error(), {
            status: 409,
            message: "Username or email already exists",
        });
    const id = await usersRepo.addUser({
        ...user,
        password: await hashPassword(password),
    });
    res.status(201).json({ success: true, data: { id, ...user } });
};

export const login = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { username, password } = req.body;
    const user = await usersRepo.getUser({ username });
    if (!user)
        throw Object.assign(new Error(), {
            status: 404,
            message: "User not found",
        });
    const { id, role, assignedArena, password: hashedPassword } = user;
    const isMatch = await comparePassword(password, hashedPassword);
    if (!isMatch)
        throw Object.assign(new Error(), {
            status: 400,
            message: "Wrong password",
        });
    const payload = { id, role, assignedArena };
    const token = generateToken(payload);
    res.json({
        success: true,
        data: { user: { id, username, role, assignedArena }, token },
    });
};

export const deleteUser = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.params;
    const deleted = await usersRepo.deleteUser({ id });
    if (!deleted)
        throw Object.assign(new Error(), {
            status: 404,
            message: "User not found",
        });
    res.json({ success: true, data: [] });
};
