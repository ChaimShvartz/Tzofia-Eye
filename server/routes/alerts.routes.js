import { Router } from "express";
import {
    createAlert,
    deleteAlert,
    getAlert,
    getAlerts,
    updateAlert,
} from "../ctrls/alerts.ctrl.js";
import { validation } from "../middlewares/validation.js";
import { CreatingAlert, UpdatingAlert } from "../models/alert.model.js";
import { arenaAccess } from "../middlewares/arenaAccess.js";

const router = Router();

router.get("/", getAlerts);
router.get("/:id", arenaAccess, getAlert);
router.post("/", validation(CreatingAlert), createAlert);
router.put("/:id", arenaAccess, validation(UpdatingAlert), updateAlert);
router.delete("/:id", arenaAccess, deleteAlert);

export default router;
