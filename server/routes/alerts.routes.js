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

const router = Router();

router.get("/", getAlerts);
router.get("/:id", getAlert);
router.post("/", validation(CreatingAlert), createAlert);
router.put("/:id", validation(UpdatingAlert), updateAlert);
router.delete("/:id", deleteAlert);

export default router;
