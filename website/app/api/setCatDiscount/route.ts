import { supabase } from "@/app/_lib/supabase"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { category, discount } = await req.json();


  const { error } = await supabase
    .from("products")
    .update({ discount })
    .eq("category", category);

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
