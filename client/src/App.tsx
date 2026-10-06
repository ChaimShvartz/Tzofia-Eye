import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAlertPage from "./pages/CreateAlertPage";
import AlertsPage from "./pages/AlertsPage";
import useAlertsStore from "./store/useAlertsStore";
import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import type { Alert } from "./types/alert";
import AlertPage from "./pages/AlertPage";
import UpdateAlertPage from "./pages/UpdateAlertPage";
import Header from "./components/Header";
import AdminPage from "./pages/AdminPage";
import CreateUserPage from "./pages/CreateUserPage";

const App = () => {
    const { executed } = useFetch<Alert[]>("alerts");
    const setAlerts = useAlertsStore((state) => state.setAlerts);
    useEffect(() => {
        executed().then((alerts) => {
            if (alerts) setAlerts(alerts);
        });
    }, []);
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<AlertsPage />} />
                    <Route path="/create-alert" element={<CreateAlertPage />} />
                    <Route
                        path="/update-alert/:id"
                        element={<UpdateAlertPage />}
                    />
                    <Route path="/alert/:id" element={<AlertPage />} />
                    <Route path="/admin/dashboard" element={<AdminPage />} />
                    <Route
                        path="/admin/create-user"
                        element={<CreateUserPage />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
