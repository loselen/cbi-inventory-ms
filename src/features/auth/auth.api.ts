"use server";

import { createSupabaseAdminClient } from "@/lib/create-supabase-admin-client";
import { createSupabaseServerClient } from "@/lib/create-supabase-server-client";
import { LoginFormData } from "./auth.types";

export async function loginByUsernameAndPassword({
  username,
  password,
}: LoginFormData) {
  const supabaseAdmin = createSupabaseAdminClient();

  const { data: userData, error: userDataError } = await supabaseAdmin
    .from("users")
    .select("email")
    .eq("username", username)
    .single();

  if (userDataError) {
    throw new Error("Invalid username or password");
  }

  const email = userData.email;

  const supabaseServer = await createSupabaseServerClient();

  const { error: loginError } = await supabaseServer.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (loginError) {
    throw new Error("Invalid username or password");
  }
}
