import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

import { Sidebar } from "../components/Sidebar";

export function AppLayout() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    function handleLogout() {
        logout();
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