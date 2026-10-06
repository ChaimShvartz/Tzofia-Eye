import db from "../db/db.js";
import { createAlertsRepo } from "../repositories/alerts.repo.js";

const collection = db.collection("alerts");
export const alertsRepo = createAlertsRepo(collection);

export const getAlerts = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { assignedArena } = req.user;
    let alerts = await alertsRepo.getAlerts();
    if (assignedArena !== "All")
        alerts = alerts.filter((a) => a.arena === assignedArena);
    res.json({ success: true, data: alerts });
};
export const getAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    res.json({ success: true, data: req.alert });
};
export const createAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { assignedArena } = req.user;
    const alert = req.body;
    if (!["All", alert.arena].includes(assignedArena))
        throw Object.assign(new Error(), {
            status: 403,
            message: "Permission denied",
        });
    alert.createdAt = new Date();
    const id = await alertsRepo.addAlert(alert);
    res.status(201).json({ success: true, data: { id, ...alert } });
};
export const updateAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.params;
    const data = req.body;
    const alertUpdated = await alertsRepo.updateAlert({ id }, data);
    res.json({ success: true, data: alertUpdated });
};
export const deleteAlert = async (
    /**@type {Request} */ req,
    /**@type {Response} */ res,
) => {
    const { id } = req.params;
    await alertsRepo.deleteAlert({ id });
    res.json({ success: true, data: [] });
};
