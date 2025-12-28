"use client";

import { Auth } from "@/features/auth/auth.component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth />
    </QueryClientProvider>
  );
}
