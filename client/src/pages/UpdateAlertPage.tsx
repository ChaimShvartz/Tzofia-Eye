import { useLocation, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import useFetch from "../hooks/useFetch";
import useAlertsStore from "../store/useAlertsStore";
import type { Alert } from "../types/alert";
import type { FormType } from "../types/form";
import useUserStore from "../store/useUserStore";

const UpdateAlertPage = () => {
    const alert = useLocation().state;
    const navigate = useNavigate();
    const token = useUserStore((state) => state.token) as string;
    const alerts = useAlertsStore((state) => state.alerts);
    const setAlerts = useAlertsStore((state) => state.setAlerts);
    const { id } = alert;
    const { error, isLoading, executed } = useFetch<Alert>(
        `alerts/${id}`,
        "PUT",
    );

    if (isLoading) return <p>טוען...</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async (form: FormType) => {
        const alert = await executed(form, token);
        if (alert) setAlerts(alerts.filter((a) => a.id !== id));
        navigate("/");
    };
    return <Form onSubmit={onSubmit} action="update" initialState={alert} />;
};

export default UpdateAlertPage;
