import db from "../db/db.js";
import { createUsersRepo } from "../repositories/users.repo.js";
import { hashPassword } from "../services/auth.services.js";

const collection = db.collection("users");
const usersRepo = createUsersRepo(collection);

export const getUsers = async (
    /**@type {Request} */ _req,
    /**@type {Response} */ res,
) => {
    const users = await usersRepo.getUsers();
    const usersForClient = users.map(({ password, ...rest }) => rest);
    res.json({ success: true, data: usersToClient });
};
export const getUser = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.params;
    const user = await usersRepo.getUser({ id });
    if (!user)
        throw Object.assign(new Error(), {
            status: 404,
            message: "User not found",
        });
    const { password, ...userForClient } = user;
    res.json({ success: true, data: userForClient });
};
export const createUser = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { password, ...uesr } = req.body;
    const id = await usersRepo.addUser({
        ...uesr,
        password: hashPassword(password),
    });
    res.status(201).json({ success: true, data: { id, ...user } });
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
