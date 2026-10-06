import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import type { Alert } from "../types/alert";
import useAlertsStore from "../store/useAlertsStore";

const arenasDict = {
    North: "צפון",
    South: "דרום",
    Center: "מרכז",
};
const prioritiesDict = {
    Low: "נמוכה",
    Medium: "בינונית",
    High: "גבוהה",
    Critical: "קריטית",
};
const statusesDict = {
    Active: "פעילה",
    Handled: "טופלה",
};

const AlertPage = () => {
    const navigate = useNavigate();
    const setAlerts = useAlertsStore((state) => state.setAlerts);
    const alerts = useAlertsStore((state) => state.alerts);
    const { id } = useParams();
    const [alert, setAlert] = useState<Alert | null>(null);
    const { isLoading, executed } = useFetch<Alert>(`/alerts/${id}`);

    const { executed: deleteAlert } = useFetch(`/alerts/${id}`, "DELETE");

    useEffect(() => {
        executed().then((alert) => {
            if (alert) setAlert(alert);
        });
    }, []);

    const onDelete = () => {
        deleteAlert()
            .then(() => setAlerts(alerts.filter((a) => a.id !== id)))
            .then(() => navigate("/"));
    };

    if (isLoading) return <p>טוען...</p>;
    if (!alert) return <p>התרעה לא נמצאה!!!</p>;
    const { displayName, description, priority, arena, status, lon, lat } =
        alert;
    return (
        <>
            <h1>{displayName}</h1>
            <p>{description}</p>
            <p>{"רמת דחיפות: " + prioritiesDict[priority]}</p>
            <p>{"פיקוד: " + arenasDict[arena]}</p>
            <p>{"סטטוס: " + statusesDict[status]}</p>
            <p>{"אורך: " + lon}</p>
            <p>{"רוחב: " + lat}</p>
            <div
                style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: "40px",
                }}
            >
                <button onClick={() => navigate("/")}>חזור למסך הבית</button>
                <button onClick={onDelete}>מחק התרעה</button>
                <button
                    onClick={() =>
                        navigate(`/update-alert/${id}`)
                    }
                >
                    עדכן התרעה
                </button>
            </div>
        </>
    );
};

export default AlertPage;
