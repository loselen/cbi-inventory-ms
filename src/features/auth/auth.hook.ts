"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormData } from "./auth.types";

export function useLogin() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginFormData) => {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
    },
    onSuccess: () => {
      router.refresh();
      router.push("/dashboard");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
}
