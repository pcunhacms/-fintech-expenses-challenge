import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">

     
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />

     
      <div className="relative w-full max-w-md rounded-xl border bg-card p-8 shadow-xl">

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}