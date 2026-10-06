import useFetch from "../hooks/useFetch";
import useUserStore from "../store/useUserStore";
import type { User } from "../types/User";

interface UsersListProps {
    users: User[];
    onDelete: (id: string) => void;
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

const UsersList = ({ users, onDelete }: UsersListProps) => {
    const token = useUserStore((state) => state.token) as string;
    const userId = useUserStore((state) => state.user?.id) as string;
    const renderItem = (user: User) => {
        const { id, username, role, assignedArena } = user;
        const { executed, error, isLoading } = useFetch(
            `auth/users/${id}`,
            "DELETE",
        );
        return (
            <li
                key={id}
                style={{ border: "1px solid", width: "30%", margin: "20px" }}
            >
                <h3>{username}</h3>
                <h5>
                    {rolesDict[role]} - {permissionDict[assignedArena]}
                </h5>
                {id !== userId && (
                    <button
                        type="button"
                        onClick={() =>
                            executed(undefined, token).then(() => onDelete(id))
                        }
                    >
                        מחק משתמש
                    </button>
                )}
                {isLoading && <p>טוען...</p>}
                {error && <p>{error}</p>}
            </li>
        );
    };
    return (
        <ul style={{ listStyle: "none", justifyItems: "center" }}>
            {users.map(renderItem)}
        </ul>
    );
};

export default UsersList;
