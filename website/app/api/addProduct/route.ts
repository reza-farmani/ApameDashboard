import { NextResponse } from "next/server";
import { supabase } from "@/app/_lib/supabase"; 

export async function POST(request: Request) {
  const data = await request.json();

  const { error } = await supabase.from('products').insert([data]);

  if (error) {
    console.error("خطا در افزودن محصول:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}