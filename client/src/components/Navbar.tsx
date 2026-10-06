import { NavLink } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import type { User } from "../types/User";
import { rolesDict } from "./UsersList";
import "./Navbar.css";

const Navbar = () => {
    const { username, role } = useUserStore((state) => state.user) as User;
    const setUser = useUserStore((state) => state.setUser);
    const logOut = () => {
        setUser(null);
        localStorage.removeItem("token");
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            <div style={{ display: "flex", gap: "15px" }}>
                <NavLink className="nav" to={"/"}>
                    דף הבית
                </NavLink>
                <NavLink className="nav" to={"/create-alert"}>
                    צור התרעה חדשה
                </NavLink>
                {role === "admin" && (
                    <>
                        <NavLink className="nav" to="/admin/dashboard">
                            משתמשים
                        </NavLink>
                        <NavLink className="nav" to="/admin/create-user">
                            צור משתמש
                        </NavLink>
                    </>
                )}
            </div>
            <h2>עין צופיה</h2>
            <h3>
                {username}({rolesDict[role]})
            </h3>
            <button type="button" onClick={logOut}>
                התנתק
            </button>
        </div>
    );
};

export default Navbar;
