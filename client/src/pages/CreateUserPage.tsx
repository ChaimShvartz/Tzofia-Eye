import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import type { User } from "../types/User";

interface CreateUserForm {
    username: string;
    password: string;
    email: string;
    role: User["role"];
}

const CreateUserPage = () => {
    const [form, setForm] = useState<CreateUserForm>({
        username: "",
        password: "",
        email: "",
        role: "general_user",
    });
    const { isLoading, error, executed } = useFetch("auth/register", "POST");
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                executed(form);
            }}
        >
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
                סיסמה
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
            <button type="submit">התחבר</button>
            {isLoading && <p>טוען...</p>}
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateUserPage;
