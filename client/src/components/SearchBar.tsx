import { useEffect, useRef } from "react";

interface SearchBarProps {
    onChange: (query: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
    const ref = useRef<null | HTMLInputElement>(null);
    useEffect(() => {
        ref.current?.focus();
    }, []);
    return (
        <label>
            הקלד שם התראה לחפש...{" "}
            <input
                ref={ref}
                type="text"
                onChange={(e) => onChange(e.target.value.toLowerCase())}
            />
        </label>
    );
};

export default SearchBar;
