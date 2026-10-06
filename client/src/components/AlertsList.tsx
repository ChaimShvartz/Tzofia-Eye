import { useNavigate } from "react-router-dom";
import type { Alert } from "../types/alert";
import "./AlertsList.css";

interface AlertListProps {
    alerts: Alert[];
}

const AlertsList = ({ alerts }: AlertListProps) => {
    const navigate = useNavigate();
    const renderItem = (alert: Alert) => {
        const { displayName, priority, id } = alert;
        return (
            <li
                key={id}
                className="alert"
                onClick={() => navigate(`/alert/${id}`)}
            >
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
