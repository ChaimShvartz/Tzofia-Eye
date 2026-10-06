import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import type { User } from "../types/User";
import UsersList from "../components/UsersList";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const navigate = useNavigate();
    const { isLoading, error, executed } = useFetch<User[]>("auth/users");
    useEffect(() => {
        executed().then((users) => users && setUsers(users));
    }, []);
    if (isLoading) return <p>טוען...</p>;
    if (error) return <p>{error}</p>;
    return (
        <>
            {users && <UsersList users={users} />}
            <button
                type="button"
                onClick={() => navigate("/admin/create-user")}
            >
                הוסף משתמש
            </button>
        </>
    );
};

export default AdminPage;
