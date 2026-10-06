import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAlertPage from "./pages/CreateAlertPage";
import AlertsPage from "./pages/AlertsPage";
import AlertPage from "./pages/AlertPage";
import UpdateAlertPage from "./pages/UpdateAlertPage";
import Header from "./components/Header";
import AdminPage from "./pages/AdminPage";
import CreateUserPage from "./pages/CreateUserPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
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
