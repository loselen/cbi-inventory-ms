"use client";

import { useMutation } from "@tanstack/react-query";
import { LoginInput } from "./auth.types";
import { getEmailFromUsername, login } from "./auth.api";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginInput) => {
      const email = await getEmailFromUsername(payload.username);
      await login(email, payload.password);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
}
