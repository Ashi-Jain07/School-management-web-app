import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("ms_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  const res = NextResponse.json({ message: "Logged out" });
  res.headers.append("Set-Cookie", cookie);
  return res;
}
