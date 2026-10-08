import { NextResponse } from "next/server";

type E10Response = {
  role: "Bhandari" | "Kamath";
  assessment: "SUPPORT" | "CONCERN" | null;
  reason: string;
  submittedAt: string | null;
};

let responses: E10Response[] = [];

export async function GET() {
  return NextResponse.json(responses);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { role, assessment, reason } = body;

  if (!role || !assessment || !reason) {
    return NextResponse.json(
      {
        message: "Role, assessment and reason are required.",
      },
      { status: 400 }
    );
  }

  if (role !== "Bhandari" && role !== "Kamath") {
    return NextResponse.json(
      {
        message: "Invalid role.",
      },
      { status: 400 }
    );
  }

  const response: E10Response = {
    role,
    assessment,
    reason,
    submittedAt: new Date().toISOString(),
  };

  responses = responses.filter(
    (item) => item.role !== role
  );

  responses.push(response);

  return NextResponse.json({
    success: true,
    response,
  });
}