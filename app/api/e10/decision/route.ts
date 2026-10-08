import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("e10_workflow")
    .select("*")
    .eq("id", 1)
    .single();

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

  return NextResponse.json(data, {
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

  const { action, decision, reason, decidedBy } = body;

  if (action === "REQUEST_VIEWS") {
    const { data, error } = await supabase
      .from("e10_workflow")
      .update({
        status: "AWAITING_VIEWS",
        views_requested: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        decision: data,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  if (action === "FINAL_DECISION") {
    if (
      !decision ||
      !reason?.trim() ||
      !decidedBy
    ) {
      return NextResponse.json(
        {
          message:
            "Decision, reason and user are required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("e10_workflow")
      .update({
        status: "DECIDED",
        decision,
        reason: reason.trim(),
        decided_by: decidedBy,
        decided_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        decision: data,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return NextResponse.json(
    { message: "Invalid action." },
    { status: 400 }
  );
}