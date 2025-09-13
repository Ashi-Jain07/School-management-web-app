import { NextResponse } from "next/server";
import { verifyToken } from "../../../../../lib/auth";

export async function GET(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.split(";").map(s => s.trim()).find(s => s.startsWith("ms_auth="));
  if (!match) return NextResponse.json({ authenticated: false });

  const token = match.split("=")[1];
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ authenticated: false });

  return NextResponse.json({ authenticated: true, email: payload.email });
}
