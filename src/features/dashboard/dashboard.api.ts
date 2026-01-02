"use server";

import { createSupabaseServerClient } from "@/lib/create-supabase-server-client";

export async function logout() {
  const supabaseServer = await createSupabaseServerClient();

  const { error } = await supabaseServer.auth.signOut();

  if (error) throw error;
}
