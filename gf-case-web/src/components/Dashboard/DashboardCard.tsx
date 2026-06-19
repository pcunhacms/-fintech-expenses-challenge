type Props = {
  label: string;
  value: string | number;
  variant?: "default" | "success" | "danger";
};

export default function DashboardCard({
  label,
  value,
  variant = "default",
}: Props) {
  const colorMap = {
    default: "text-emerald-900",
    success: "text-emerald-600",
    danger: "text-red-600",
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className={`mt-2 text-2xl font-semibold ${colorMap[variant]}`}>
        {value}
      </p>
    </div>
  );
}