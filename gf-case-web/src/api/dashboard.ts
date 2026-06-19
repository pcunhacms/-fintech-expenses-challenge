import api from "./axios";

import type { DashboardData } from "../types/dashboard";


export async function getDashboard(): Promise<DashboardData> {
    const res = await api.get<DashboardData>("/dashboard");
    return res;
}