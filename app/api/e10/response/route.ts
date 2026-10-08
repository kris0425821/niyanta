import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("e10_responses")
    .select("*")
    .order("submitted_at", {
      ascending: true,
    });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    data.map((item) => ({
      role: item.role,
      assessment: item.assessment,
      reason: item.reason,
      submittedAt: item.submitted_at,
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    role,
    assessment,
    reason,
  } = body;

  if (!role || !assessment || !reason) {
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

  const { data, error } = await supabase
    .from("e10_responses")
    .upsert(
      {
        role,
        assessment,
        reason,
        submitted_at: new Date().toISOString(),
      },
      {
        onConflict: "role",
      }
    )
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
    response: {
      role: data.role,
      assessment: data.assessment,
      reason: data.reason,
      submittedAt: data.submitted_at,
    },
  });
}