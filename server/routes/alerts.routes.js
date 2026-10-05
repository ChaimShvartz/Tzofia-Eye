import { Router } from "express";
import {
    createAlert,
    deleteAlert,
    getAlert,
    getAlerts,
    updateAlert,
} from "../ctrls/alerts.ctrl.js";

const router = Router();

router.get("/", getAlerts);
router.get("/:id", getAlert);
router.post("/", createAlert);
router.put("/:id", updateAlert);
router.delete("/:id", deleteAlert);

export default router;
