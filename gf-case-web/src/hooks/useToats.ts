import { useToastStore } from "../store/toast.store";

export function useToast() {
  const add = useToastStore((state) => state.add);

  return {
    success: (message: string) =>
      add({
        type: "success",
        message,
      }),

    error: (message: string) =>
      add({
        type: "error",
        message,
      }),

    info: (message: string) =>
      add({
        type: "info",
        message,
      }),
  };
}