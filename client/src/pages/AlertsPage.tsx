import { useMemo, useState } from "react";
import AlertsList from "../components/AlertsList";
import AlertsMap from "../components/AlertsMap";
import useAlertsStore from "../store/useAlertsStore";
import SearchBar from "../components/SearchBar";

const AlertsPage = () => {
    let alerts = useAlertsStore((state) => state.alerts);
    const [query, setQuery] = useState("");

    alerts = useMemo(() => {
        return alerts.filter((a) => a.displayName.includes(query));
    }, [query, alerts]);

    return (
        <>
            <SearchBar onChange={setQuery} />
            <div style={{ display: "flex" }}>
                <AlertsList alerts={alerts} />
                <AlertsMap alerts={alerts} />;
            </div>
        </>
    );
};

export default AlertsPage;
