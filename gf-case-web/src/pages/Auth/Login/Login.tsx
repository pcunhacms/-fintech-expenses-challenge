
import AuthLayout from "../../../components/Auth/AuthLayout";
import LoginForm from "../../../components/Auth/LoginForm";

export default function Login() {
   return (
    <AuthLayout
      title="Fintech"
      subtitle="Entre para continuar"
    >
      <LoginForm />
    </AuthLayout>
  ); 
}