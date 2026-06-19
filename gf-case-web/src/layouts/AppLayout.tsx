import { Outlet, useNavigate } from "react-router-dom";
import { authStore, useAuthStore } from "../store/auth.store";

import { Sidebar } from "../components/Sidebar";

export function AppLayout() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        authStore.setState({
            token: null,
            user: null,
        });

        navigate("/login");
    }


    return (
    <div className="flex h-screen">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );



}