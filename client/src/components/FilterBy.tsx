interface Option {
    display: string;
    value: string;
}

interface FilterByProps<T> {
    field: "arena" | "priority";
    options: Option[];
    onChange: (filter: T) => void;
}
const FilterBy = <T,>({ field, options, onChange }: FilterByProps<T>) => {
    const renderOption = ({ display, value }: Option) => (
        <option id={value} value={value}>{display}</option>
    );
    return (
        <label>
            {`סנן לפי ${field === "arena" ? "פיקוד" : "דחיפות"}`}
            <select onChange={(e) => onChange(e.target.value as T)}>
                {options.map(renderOption)}
            </select>
        </label>
    );
};

export default FilterBy;
