import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useToast } from "../../hooks/useToats";

export default function RegisterForm() {
    const navigate = useNavigate();
    const toast = useToast();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            toast.success("Conta criada com sucesso");
            navigate("/login");

        } catch (error: any) {
            toast.error(
                error?.data?.message || "Erro ao criar conta");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleRegister} className="space-y-4">

            <input
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-md border px-3 text-sm"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-md border px-3 text-sm"
            />

            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-md border px-3 text-sm"
            />

            <button
                disabled={loading}
                className="h-10 w-full rounded-md bg-black text-white text-sm disabled:opacity-50"
            >
                {loading ? "Criando..." : "Criar conta"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-primary hover:underline"
                >
                    Entrar
                </button>
            </p>

        </form>
    );
}