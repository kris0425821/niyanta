import { NextResponse } from "next/server";

const users = [
  {
    email: "kartik@anantha.com",
    password: "kartik123",
    redirect: "/kartik",
  },
  {
    email: "pranav@anantha.com",
    password: "pranav123",
    redirect: "/pranav",
  },
  {
    email: "bhandari@anantha.com",
    password: "bhandari123",
    redirect: "/bhandari",
  },
  {
    email: "kamath@anantha.com",
    password: "kamath123",
    redirect: "/kamath",
  },
];

export async function POST(request: Request) {
  const body = await request.json();

  const email = body.email?.toLowerCase().trim();
  const password = body.password;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid email or password.",
      },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    redirect: user.redirect,
  });

  response.cookies.set("niyanta_user", user.email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}