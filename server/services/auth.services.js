import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const { SECRET_JWT } = process.env;

export const hashPassword = (password) => {
    return hash(password, 10);
};

export const comparePassword = (password, hashadPassword) => {
    return compare(password, hashadPassword);
};

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_JWT);
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_JWT);
};
