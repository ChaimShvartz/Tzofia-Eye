import { useEffect, useMemo, useState } from "react";
import AlertsList from "../components/AlertsList";
import AlertsMap from "../components/AlertsMap";
import useAlertsStore from "../store/useAlertsStore";
import SearchBar from "../components/SearchBar";
import FilterBy from "../components/FilterBy";
import type { Alert } from "../types/alert";
import useFetch from "../hooks/useFetch";
import useUserStore from "../store/useUserStore";
import { useLocation } from "react-router-dom";
import type { User } from "../types/User";

interface FilterState {
    arena: Alert["arena"] | null;
    priority: "Low" | "Medium" | "High" | "Critical" | null;
}

const AlertsPage = () => {
    const soundAlarm: boolean = useLocation().state?.soundAlarm;
    const user = useUserStore((state) => state.user) as User;
    const { executed } = useFetch<Alert[]>("alerts");
    const setAlerts = useAlertsStore((state) => state.setAlerts);
    const token = useUserStore((state) => state.token) as string;
    useEffect(() => {
        executed(undefined, token).then((alerts) => {
            if (alerts) setAlerts(alerts);
        });
    }, []);

    let alerts = useAlertsStore((state) => state.alerts);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<FilterState>({
        arena: null,
        priority: null,
    });

    const isAranaFiltered = (a: Alert) =>
        [null, "All"].includes(filter.arena) ? true : a.arena === filter.arena;
    const isPriorityFiltered = (a: Alert) =>
        [null, "All"].includes(filter.priority)
            ? true
            : a.priority === filter.priority;

    alerts = useMemo(() => {
        return alerts.filter((a) => a.displayName.includes(query.trim()));
    }, [query, alerts]);

    alerts = useMemo(() => {
        return alerts.filter(
            (a) => isAranaFiltered(a) && isPriorityFiltered(a),
        );
    }, [filter, alerts]);

    return (
        <>
            <div style={{ display: "flex"}}>
                <SearchBar onChange={setQuery} />
                {user.role !== "arena_user" && (
                    <FilterBy
                        field="arena"
                        options={[
                            { display: "הכל", value: "All" },
                            { display: "מרכז", value: "Center" },
                            { display: "צפון", value: "North" },
                            { display: "דרום", value: "South" },
                        ]}
                        onChange={(arena: Alert["arena"]) =>
                            setFilter((prev) => ({ ...prev, arena }))
                        }
                    />
                )}
                <FilterBy
                    field="priority"
                    options={[
                        { display: "הכל", value: "All" },
                        { display: "נמוכה", value: "Low" },
                        { display: "בינונית", value: "Medium" },
                        { display: "גבוהה", value: "High" },
                        { display: "קריטית", value: "Critical" },
                    ]}
                    onChange={(priority: Alert["priority"]) =>
                        setFilter((prev) => ({ ...prev, priority }))
                    }
                />
            </div>
            {soundAlarm && (
                <div
                    style={{
                        background: "red",
                        width: "200px",
                        alignSelf: "center",
                        margin: "5px",
                    }}
                >
                    התראה חמורה - דרוש טיפול מיידי
                </div>
            )}
            <div style={{ display: "flex" }}>
                <AlertsList alerts={alerts} />
                <AlertsMap alerts={alerts} />
            </div>
        </>
    );
};

export default AlertsPage;
