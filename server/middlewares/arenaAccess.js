import { alertsRepo } from "../ctrls/alerts.ctrl.js";

export const arenaAccess = async (req, res, next) => {
    const { id } = req.params;
    const { assignedArena } = req.user;
    if (arenaAccess === "All" && req.method !== "GET") next();
    const alert = await alertsRepo.getAlert({ id });
    if (!alert)
        throw Object.assign(new Error(), {
            status: 404,
            message: "Alert not found",
        });
    if (!["All", alert.arena].includes(assignedArena))
        throw Object.assign(new Error(), {
            status: 403,
            message: "Permission denied",
        });
    req.alert = alert;
    next();
};
