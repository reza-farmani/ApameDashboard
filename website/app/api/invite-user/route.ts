import { supabase } from "@/app/_lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name
    }
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ user: data.user }, { status: 200 })
}