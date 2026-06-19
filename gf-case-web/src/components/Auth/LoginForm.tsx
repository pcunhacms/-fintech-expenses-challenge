import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest, meRequest } from "../../api/auth";
import { useAuthStore } from "../../store/auth.store";
import { useToast } from "../../hooks/useToats";

export default function LoginForm() {
    const navigate = useNavigate();
    const toast = useToast();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const loginData = await loginRequest(email, password);

            setAuth(loginData.access_token, loginData.user ?? {
                id: "",
                name: "",
                email: "",
            });

            const user = await meRequest();

            setAuth(loginData.access_token, user);

            toast.success("Login realizado com sucesso");
            navigate("/dashboard");
        } catch {
            toast.error("Erro ao efetuar login. Verifique e-mail e senha.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
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
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-full rounded-md bg-black text-white text-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <span
                    onClick={() => navigate("/register")}
                    className="cursor-pointer text-primary hover:underline"
                >
                    Registrar-se
                </span>
            </p>
        </form>
    );
}