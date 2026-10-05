import { useMemo, useState } from "react";
import AlertsList from "../components/AlertsList";
import AlertsMap from "../components/AlertsMap";
import useAlertsStore from "../store/useAlertsStore";
import SearchBar from "../components/SearchBar";
import FilterBy from "../components/FilterBy";
import type { Alert } from "../types/alert";

interface FilterState {
    arena: Alert["arena"] | null;
    priority: "Low" | "Medium" | "High" | "Critical" | null;
}

const AlertsPage = () => {
    let alerts = useAlertsStore((state) => state.alerts);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<FilterState>({
        arena: null,
        priority: null,
    });

    const isAranaFiltered = (a: Alert) =>
        filter.arena ? a.arena === filter.arena : true;
    const isPriorityFiltered = (a: Alert) =>
        filter.priority ? a.priority === filter.priority : true;

    alerts = useMemo(() => {
        return alerts.filter((a) => a.displayName.includes(query));
    }, [query, alerts]);

    alerts = useMemo(() => {
        return alerts.filter(
            (a) => isAranaFiltered(a) && isPriorityFiltered(a),
        );
    }, [filter, alerts]);

    return (
        <>
            <div style={{ display: "flex" }}>
                <SearchBar onChange={setQuery} />
                <FilterBy
                    field="arena"
                    options={[
                        { display: "מרכז", value: "Center" },
                        { display: "צפון", value: "North" },
                        { display: "דרום", value: "South" },
                    ]}
                    onChange={(arena: Alert["arena"]) =>
                        setFilter((prev) => ({ ...prev, arena }))
                    }
                />
                <FilterBy
                    field="priority"
                    options={[
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
            <div style={{ display: "flex" }}>
                <AlertsList alerts={alerts} />
                <AlertsMap alerts={alerts} />
            </div>
        </>
    );
};

export default AlertsPage;
