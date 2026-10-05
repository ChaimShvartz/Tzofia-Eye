import db from "../db/db.js";
import { createAlertsRepo } from "../repositories/alerts.repo.js";

const collection = db.collection("alerts");
const repo = createAlertsRepo(collection);

export const getAlerts = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {};
export const getAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {};
export const createAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {};
export const updateAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {};
export const deleteAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {};
