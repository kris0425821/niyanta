import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);


// Demo only: puts E10 back to the start so the journey can be run again.
export async function POST() {
  const { error: workflowError } = await supabase
    .from("e10_workflow")
    .update({
      status: "PENDING",
      decision: null,
      reason: "",
      decided_by: null,
      decided_at: null,
      views_requested: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (workflowError) {
    return NextResponse.json(
      { message: workflowError.message },
      { status: 500 }
    );
  }

  const { error: responsesError } = await supabase
    .from("e10_responses")
    .delete()
    .not("id", "is", null);

  if (responsesError) {
    return NextResponse.json(
      { message: responsesError.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}