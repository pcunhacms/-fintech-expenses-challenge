import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest, meRequest } from "../../api/auth";
import { authStore } from "../../store/auth.store";
import { useToast } from "../../hooks/useToats";

export default function LoginForm() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      const loginData = await loginRequest(email, password);

      localStorage.setItem("token", loginData.access_token);

      const user = await meRequest();
      localStorage.setItem("user", JSON.stringify(user));

      authStore.setState({
        token: loginData.access_token,
        user,
      });

      toast.success("Login realizado com sucesso");
      navigate("/dashboard");

      
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Erro ao realizar login"
      );
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

      <button className="h-10 w-full rounded-md bg-black text-white text-sm">
        Entrar
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