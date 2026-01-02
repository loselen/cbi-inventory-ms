"use client";

import { useMutation } from "@tanstack/react-query";
import { logout } from "./dashboard.api";
import { useRouter } from "next/navigation";

export function useDashboard() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
  };
}
