"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormData } from "./auth.types";
import { fetchEmailByUsername, signInWithEmail } from "./auth.api";

export function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (payload: LoginFormData) => {
      const email = await fetchEmailByUsername(payload.username);
      await signInWithEmail(email, payload.password);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  return {
    submitLogin: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
