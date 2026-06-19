import { Link, useLocation } from "react-router-dom";
import type { User } from "../../types/auth";
import {
  LayoutDashboard,
  CreditCard,
  Tags,
  LogOut,
  User as UserIcon,
} from "lucide-react";

type Props = {
  user: User | null;
  onLogout: () => void;
};

export function Sidebar({ user, onLogout }: Props) {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
     ${
       active
         ? "bg-gray-100 text-gray-900 font-medium"
         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
     }`;
     console.log("dados do user", user)
  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">

      {/* USER */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <UserIcon size={18} className="text-gray-600" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-500">Logado como</p>
            <p className="text-sm font-semibold truncate">
              {user?.name || "Usuário"}
            </p>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-2 space-y-1">

        <Link
          to="/dashboard"
          className={linkClass(isActive("/dashboard"))}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/transactions"
          className={linkClass(isActive("/transactions"))}
        >
          <CreditCard size={18} />
          Transações
        </Link>

        <Link
          to="/categories"
          className={linkClass(isActive("/categories"))}
        >
          <Tags size={18} />
          Categorias
        </Link>

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>

    </aside>
  );
}