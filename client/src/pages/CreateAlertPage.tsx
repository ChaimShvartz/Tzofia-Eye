import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import useFetch from "../hooks/useFetch";
import useAlertsStore from "../store/useAlertsStore";
import type { Alert } from "../types/alert";
import type { FormType } from "../types/form";

const CreateAlertPage = () => {
    const navigate = useNavigate();
    const addAlert = useAlertsStore((state) => state.addAlert);
    const { error, isLoading, executed } = useFetch<Alert>("", "POST");

    if (isLoading) return <p>טוען...</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async (form: FormType) => {
        const alert = await executed(form);
        if (alert) addAlert(alert);
        navigate("/");
    };
    return <Form onSubmit={onSubmit} />;
};

export default CreateAlertPage;
