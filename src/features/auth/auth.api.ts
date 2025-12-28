import { supabase } from "@/lib/supabase";

export async function getEmailFromUsername(username: string) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("username", username)
    .single();

  if (error) throw error;

  return data.email;
}

export async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw error;
}
