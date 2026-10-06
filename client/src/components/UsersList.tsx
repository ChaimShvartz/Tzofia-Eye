import useFetch from "../hooks/useFetch";
import type { User } from "../types/User";

interface UsersListProps {
    users: User[];
}

export const rolesDict = {
    admin: "מנהל",
    general_user: "חייל כללי",
    arena_user: "חייל זירה",
};

const permissionDict = {
    All: "ארצי",
    Center: "מרכז",
    North: "צפון",
    South: "דרום",
};

const UsersList = ({ users }: UsersListProps) => {
    const renderItem = (user: User) => {
        const { id, username, role, assignedArena } = user;
        const { executed, error, isLoading } = useFetch(
            `auth/users/:${id}`,
            "DELETE",
        );
        return (
            <li key={id}>
                <h3>{username}</h3>
                <h5>
                    {rolesDict[role]} - {permissionDict[assignedArena]}
                </h5>
                <button type="button" onClick={() => executed()}>
                    מחק משתמש
                </button>
                {isLoading && <p>טוען...</p>}
                {error && <p>{error}</p>}
            </li>
        );
    };
    return <ul>{users.map(renderItem)}</ul>;
};

export default UsersList;
