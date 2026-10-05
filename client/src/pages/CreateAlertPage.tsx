import Form from "../components/Form";
import useFetch from "../hooks/useFetch";
import useAlertsStore from "../store/useAlertsStore";
import type { Alert } from "../types/alert";
import type { FormType } from "../types/form";

const CreateAlertPage = () => {
    const addAlert = useAlertsStore((state) => state.addAlert);
    const { error, isLoading, executed } = useFetch<Alert>("", "POST");

    if (isLoading) return <p>טוען...</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async (form:FormType) => {
        console.log({form});
        
        const alert = await executed(form)
        if(alert) addAlert(alert)
    }
    // if (data) {
    //     addAlert(data);
    //     return <p>ההתראה נוספה בהצלחה</p>;
    // }

    return <Form onSubmit={onSubmit} />;
};

export default CreateAlertPage;
