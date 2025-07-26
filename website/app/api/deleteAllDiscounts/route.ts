import { NextResponse } from "next/server";
import { supabase } from "@/app/_lib/supabase";

export async function POST() {
  const { error } = await supabase
    .from("products")
    .update({ discount: null })
    .not("discount", "is", null);

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
