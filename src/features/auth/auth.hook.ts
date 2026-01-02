"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormData } from "./auth.types";
import { loginByUsernameAndPassword } from "./auth.api";

export function useLogin() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginFormData) => {
      await loginByUsernameAndPassword(payload);
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
