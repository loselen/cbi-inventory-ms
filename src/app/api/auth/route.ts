import { loginFormSchema } from "@/features/auth/auth.types";
import { createSupabaseAdminClient } from "@/lib/create-supabase-admin-client";
import { createSupabaseServerClient } from "@/lib/create-supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabaseAdmin = createSupabaseAdminClient();

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return new NextResponse("Invalid JSON body", { status: 400 });
  }

  const validationResult = loginFormSchema.safeParse(payload);

  if (!validationResult.success) {
    return new NextResponse(validationResult.error.message, { status: 400 });
  }

  const { username, password } = validationResult.data;

  const { data: userData, error: userLookupError } = await supabaseAdmin
    .from("users")
    .select("email")
    .eq("username", username)
    .single();

  if (userLookupError) {
    return new NextResponse(userLookupError.message, { status: 404 });
  }

  const supabaseServer = await createSupabaseServerClient();

  const { error: signInError } = await supabaseServer.auth.signInWithPassword({
    email: userData.email,
    password: password,
  });

  if (signInError) {
    return new NextResponse(signInError.message, { status: 400 });
  }

  return new NextResponse("Sign in success", { status: 200 });
}
