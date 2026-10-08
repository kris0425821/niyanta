import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("e10_responses")
    .select("*")
    .order("submitted_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }

  return NextResponse.json(data ?? [], {
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { role, assessment, reason } = body;

  if (!role || !assessment || !reason?.trim()) {
    return NextResponse.json(
      {
        message:
          "Role, assessment and reason are required.",
      },
      { status: 400 }
    );
  }

  if (
    role !== "Bhandari" &&
    role !== "Kamath"
  ) {
    return NextResponse.json(
      { message: "Invalid role." },
      { status: 400 }
    );
  }

  if (
    assessment !== "SUPPORT" &&
    assessment !== "CONCERN"
  ) {
    return NextResponse.json(
      { message: "Invalid assessment." },
      { status: 400 }
    );
  }

  const { data: existing } = await supabase
    .from("e10_responses")
    .select("id")
    .eq("role", role)
    .maybeSingle();

  let result;

  if (existing) {
    result = await supabase
      .from("e10_responses")
      .update({
        assessment,
        reason: reason.trim(),
        submitted_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await supabase
      .from("e10_responses")
      .insert({
        role,
        assessment,
        reason: reason.trim(),
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();
  }

  if (result.error) {
    return NextResponse.json(
      { message: result.error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      response: result.data,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}