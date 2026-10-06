import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

export interface LoginForm {
    username: string;
    password: string;
}
const LoginPage = () => {
    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const { isLoading, error, executed } = useFetch("auth/login", "POST");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <button type="submit">התחבר</button>
            {isLoading && <p>טוען...</p>}
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginPage;
