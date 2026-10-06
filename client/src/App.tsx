import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAlertPage from "./pages/CreateAlertPage";
import AlertsPage from "./pages/AlertsPage";
import AlertPage from "./pages/AlertPage";
import UpdateAlertPage from "./pages/UpdateAlertPage";
import AdminPage from "./pages/AdminPage";
import CreateUserPage from "./pages/CreateUserPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import useUserStore from "./store/useUserStore";
import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import type { User } from "./types/User";

const App = () => {
    const setUser = useUserStore((state) => state.setUser);
    const { executed } = useFetch<User>("auth/me");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        executed(undefined, token)
            .then((user) => {
                user && setUser(user, token);
                return token;
            })
            .then((token) => localStorage.setItem("token", token))
            .catch(() => localStorage.removeItem("token"));
    }, []);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoutes requiredManager={true} />}>
                        <Route
                            path="/admin/dashboard"
                            element={<AdminPage />}
                        />
                        <Route
                            path="/admin/create-user"
                            element={<CreateUserPage />}
                        />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<AlertsPage />} />
                        <Route
                            path="/create-alert"
                            element={<CreateAlertPage />}
                        />
                        <Route
                            path="/update-alert/:id"
                            element={<UpdateAlertPage />}
                        />
                        <Route path="/alert/:id" element={<AlertPage />} />
                    </Route>

                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
