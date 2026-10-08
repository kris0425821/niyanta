import { NextResponse } from "next/server";

let e10Decision = {
  status: "PENDING",
  decision: null as string | null,
  reason: "",
  decidedBy: null as string | null,
  decidedAt: null as string | null,
  viewsRequested: false,
};

export async function GET() {
  return NextResponse.json(e10Decision);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { action, decision, reason, decidedBy } = body;

  // Kartik requests views
  if (action === "REQUEST_VIEWS") {
    e10Decision = {
      ...e10Decision,
      status: "AWAITING_VIEWS",
      viewsRequested: true,
    };

    return NextResponse.json({
      success: true,
      decision: e10Decision,
    });
  }

  // Kartik makes final decision
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

    e10Decision = {
      ...e10Decision,
      status: "DECIDED",
      decision,
      reason,
      decidedBy,
      decidedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      decision: e10Decision,
    });
  }

  return NextResponse.json(
    {
      message: "Invalid action.",
    },
    { status: 400 }
  );
}