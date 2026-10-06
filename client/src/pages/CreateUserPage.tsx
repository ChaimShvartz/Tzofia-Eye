import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import useUserStore from "../store/useUserStore";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";

interface CreateUserForm {
    username: string;
    password: string;
    email: string;
    role: User["role"];
    assignedArena: User["assignedArena"];
}

const CreateUserPage = () => {
    const navigate = useNavigate()
    const token = useUserStore((state) => state.token) as string;
    const [form, setForm] = useState<CreateUserForm>({
        username: "",
        password: "",
        email: "",
        role: "general_user",
        assignedArena: "All",
    });
    const { isLoading, error, executed } = useFetch("auth/register", "POST");
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        executed(form, token).then(() => navigate('/admin/dashboard'));
    };
    return (
        <form onSubmit={onSubmit}>
            <label>
                שם משתמש
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    required
                />
            </label>
            <label>
                סיסמה
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    required
                />
            </label>
            <label>
                מייל
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                />
            </label>
            <label>
                <select
                    name="role"
                    value={form.role}
                    required
                    onChange={onChange}
                >
                    <option value="general_user">משתמש כללי</option>
                    <option value="arena_user">משתמש זירה</option>
                    <option value="admin">מנהל</option>
                </select>
            </label>
            {form.role === "arena_user" && (
                <label>
                    <select
                        name="assignedArena"
                        value={form.assignedArena}
                        required
                        onChange={onChange}
                    >
                        <option value="Center">מרכז</option>
                        <option value="North "> צפון</option>
                        <option value="South "> דרום</option>
                    </select>
                </label>
            )}
            <button type="submit">התחבר</button>
            {isLoading && <p>טוען...</p>}
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateUserPage;
