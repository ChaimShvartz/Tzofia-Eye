interface SearchBarProps {
    onChange: (query: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
    return (
        <label>
            הקלד שם התראה לחפש...{" "}
            <input type="text" onChange={(e) => onChange(e.target.value.toLowerCase())} />
        </label>
    );
};

export default SearchBar;
