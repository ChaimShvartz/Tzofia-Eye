import { useLocation, useParams } from "react-router-dom";
import Form from "../components/Form";
import useFetch from "../hooks/useFetch";
import useAlertsStore from "../store/useAlertsStore";
import type { Alert } from "../types/alert";
import type { FormType } from "../types/form";

const UpdateAlertPage = () => {
    const { id } = useParams();

    const alerts = useAlertsStore((state) => state.alerts);
    const setAlerts = useAlertsStore((state) => state.setAlerts);
    const { error, isLoading, executed } = useFetch<Alert>(`/${id}`, "PUT");

    if (isLoading) return <p>טוען...</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async (form: FormType) => {
        const alert = await executed(form);
        if (alert) setAlerts(alerts.filter((a) => a.id !== id));
    };
    return <Form onSubmit={onSubmit} action="update" />;
};

export default UpdateAlertPage;
