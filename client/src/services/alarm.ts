import type { Alert } from "../types/alert";

const TIME_FOR_ALARM = 60 * 1000;

export const validateAlarm = async (alerts: Alert[]) => {
    const curTime = new Date().getTime();
    let ctr = 0;
    for (const { createdAt, priority, status } of alerts) {
        if (
            priority === "Critical" &&
            status === "Active" &&
            curTime - new Date(createdAt).getTime() < TIME_FOR_ALARM
        ) {
            ctr += 1;
            if (ctr > 2) return true;
        }
    }
};
