import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      
      navigate("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Erro ao criar conta"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">

    {/* soft background ambience */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
    <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />

    {/* card */}
    <div className="relative w-full max-w-md rounded-xl border bg-card p-8 shadow-xl">

      {/* header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Criar conta
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Comece a organizar suas finanças
        </p>
      </div>

      {/* form */}
      <form onSubmit={handleRegister} className="space-y-4">

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {error && (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 p-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-md bg-black text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Criando conta..." : "Criar conta"}
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
    </div>
  </div>
);
}