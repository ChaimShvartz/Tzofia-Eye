import db from "../db/db.js";
import { createAlertsRepo } from "../repositories/alerts.repo.js";

const collection = db.collection("alerts");
const alertsRepo = createAlertsRepo(collection);

export const getAlerts = async (
    /**@type {Request} */ _req,
    /**@type {Response} */ res,
) => {
    const alerts = await alertsRepo.getAlerts();
    res.json({ data: alerts });
};
export const getAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.params;
    const alert = await alertsRepo.getAlert({ id });
    if (!alert)
        throw Object.assign(new Error(), {
            status: 404,
            message: "Alert not found",
        });
    res.json({ data: alert });
};
export const createAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const alert = req.body;
    const id = await alertsRepo.addAlert(alert);
    res.status(201).json({ data: { id, ...alert } });
};
export const updateAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.params;    
    const data = req.body;
    const alertUpdated = await alertsRepo.updateAlert({ id }, data);
    if (!alertUpdated)
        throw Object.assign(new Error(), {
            status: 404,
            message: "Alert not found",
        });
    res.json({ data: alertUpdated });
};
export const deleteAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.params;
    const deleted = await alertsRepo.deleteAlert({ id });
    if (!deleted)
        throw Object.assign(new Error(), {
            status: 404,
            message: "Alert not found",
        });
    res.status(204).send();
};
