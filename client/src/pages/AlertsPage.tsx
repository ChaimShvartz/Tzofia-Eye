import AlertsList from "../components/AlertsList";
import AlertsMap from "../components/AlertsMap";
import useAlertsStore from "../store/useAlertsStore";

const AlertsPage = () => {
    const alerts = useAlertsStore((state) => state.alerts);
    return (
        <div style={{ display: "flex"}}>
            <AlertsList alerts={alerts} />
            <AlertsMap alerts={alerts} />;
        </div>
    );
};

export default AlertsPage;
