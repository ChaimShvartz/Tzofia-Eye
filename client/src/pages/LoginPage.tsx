import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import useUserStore from "../store/useUserStore";
import type { User } from "../types/User";
import { Navigate } from "react-router-dom";

export interface LoginForm {
    username: string;
    password: string;
}

interface LoginRes {
    user: User;
    token: string;
}

const LoginPage = () => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const { isLoading, error, executed } = useFetch<LoginRes>(
        "auth/login",
        "POST",
    );
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    if (user) return <Navigate to={"/"} />;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                executed(form)
                    .then((res) => {
                        if (!res) return;
                        const { user, token } = res;
                        setUser(user, token);
                        return token;
                    })
                    .then(
                        (token) =>
                            token && localStorage.setItem("token", token),
                    );
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
