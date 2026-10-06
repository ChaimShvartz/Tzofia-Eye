import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

const { SECRET_JWT } = process.env;

export const hashPassword = (password) => {
    return hash(password, 10);
};

export const comparePassword = (password, hashadPassword) => {
    return compare(password, hashPassword);
};

export const generateToken = (payload) => {
    return sign(payload, SECRET_JWT);
};

export const verifyToken = (token) => {
    return verify(token, SECRET_JWT);
};
