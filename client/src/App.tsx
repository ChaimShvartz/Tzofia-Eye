import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAlertPage from "./pages/CreateAlertPage";
import AlertsPage from "./pages/AlertsPage";
import useAlertsStore from "./store/useAlertsStore";
import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import type { Alert } from "./types/alert";

const App = () => {
    const { executed } = useFetch<Alert[]>();
    const setAlerts = useAlertsStore((state) => state.setAlerts);
    useEffect(() => {
        executed().then((alerts) => {
            if (alerts) setAlerts(alerts);
        });
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AlertsPage />} />
                <Route path="/create-alert" element={<CreateAlertPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
