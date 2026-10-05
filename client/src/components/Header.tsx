import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink to={"/"}>דף הבית</NavLink>
            <NavLink to={"/create-alert"}>צור התרעה חדשה</NavLink>
        </div>
    );
};

export default Header;
