import AuthLayout from "../../../components/Auth/AuthLayout";
import RegisterForm from "../../../components/Auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Comece a organizar suas finanças"
    >
      <RegisterForm />
    </AuthLayout>
  );
}