import { NextResponse } from "next/server";
import { supabase } from "@/app/_lib/supabase";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  const { error } = await supabase.from("customers").update(body).eq("id", id);

  if (error) {
    console.error("خطا در بروزرسانی محصول:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
