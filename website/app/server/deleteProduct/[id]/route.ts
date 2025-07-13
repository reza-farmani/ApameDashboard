import { NextResponse } from "next/server";
import { supabase } from "@/app/_lib/supabase";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("خطا در حذف محصول:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
