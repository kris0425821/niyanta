import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: data.status,
    decision: data.decision,
    reason: data.reason,
    decidedBy: data.decided_by,
    decidedAt: data.decided_at,
    viewsRequested: data.views_requested,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    action,
    decision,
    reason,
    decidedBy,
  } = body;

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

    return NextResponse.json({
      success: true,
      decision: {
        status: data.status,
        decision: data.decision,
        reason: data.reason,
        decidedBy: data.decided_by,
        decidedAt: data.decided_at,
        viewsRequested: data.views_requested,
      },
    });
  }

  if (action === "FINAL_DECISION") {
    if (!decision || !reason || !decidedBy) {
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
        reason,
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

    return NextResponse.json({
      success: true,
      decision: {
        status: data.status,
        decision: data.decision,
        reason: data.reason,
        decidedBy: data.decided_by,
        decidedAt: data.decided_at,
        viewsRequested: data.views_requested,
      },
    });
  }

  return NextResponse.json(
    { message: "Invalid action." },
    { status: 400 }
  );
}