import { useEffect } from "react";
import { useToastStore } from "../../store/toast.store";

export default function Toast() {
  const { toasts, remove } = useToastStore();

  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast) => {
      return setTimeout(() => {
        remove(toast.id);
      }, 4000); 
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [toasts, remove]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            animate-slide-in
            px-4 py-3 rounded-lg shadow-lg text-white
            transition-all duration-300
            cursor-pointer
            ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }
          `}
          onClick={() => remove(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}