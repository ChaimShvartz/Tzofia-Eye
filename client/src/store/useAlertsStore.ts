import { create } from "zustand";
import type { Alert } from "../types/alert";

interface AlertsStore {
    alerts: Alert[];
    setAlerts: (alerts: Alert[]) => void;
    addAlert: (alert: Alert) => void;
}

const useAlertsStore = create<AlertsStore>((set) => ({
    alerts: [],
    setAlerts: (alerts: Alert[]) => set({ alerts }),
    addAlert: (alert: Alert) =>
        set(({ alerts }) => ({ alerts: [...alerts, alert] })),
}));

export default useAlertsStore;
