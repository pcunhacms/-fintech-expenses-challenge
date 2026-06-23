import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/auth.store";

export function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token = useAuthStore(
    (state) => state.token
  );

  const hydrated = useAuthStore(
    (state) => state.hydrated
  );

  if (!hydrated) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}