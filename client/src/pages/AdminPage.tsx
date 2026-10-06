import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import type { User } from "../types/User";
import UsersList from "../components/UsersList";
import useUserStore from "../store/useUserStore";

const AdminPage = () => {
    const token = useUserStore((state) => state.token) as string;
    const [users, setUsers] = useState<User[] | null>(null);
    const { isLoading, error, executed } = useFetch<User[]>("auth/users");
    useEffect(() => {
        executed(undefined, token).then((users) => users && setUsers(users));
    }, []);
    if (isLoading) return <p>טוען...</p>;
    if (error) return <p>{error}</p>;
    return (
        users && (
            <UsersList
                users={users}
                onDelete={(deletedId: string) =>
                    setUsers((users) =>
                        users ? users.filter((u) => u.id !== deletedId) : users,
                    )
                }
            />
        )
    );
};

export default AdminPage;
