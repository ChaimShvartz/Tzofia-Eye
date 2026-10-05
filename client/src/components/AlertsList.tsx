import type { Alert } from "../types/alert";
import "./AlertsList.css";

interface AlertListProps {
    alerts: Alert[];
}

const AlertsList = ({ alerts }: AlertListProps) => {
    const renderItem = (alert: Alert) => {
        const { displayName, priority, id } = alert;
        return (
            <li id={id} className="alert">
                <h3>{displayName}</h3>
                <p>{priority}</p>
            </li>
        );
    };
    return (
        <ul style={{ width: "50%", listStyle: "none" }}>
            {alerts.map(renderItem)}
        </ul>
    );
};

export default AlertsList;
