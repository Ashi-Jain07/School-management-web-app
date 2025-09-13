// app/api/auth/verify-otp/route.js
import { NextResponse } from "next/server";
import { pool } from "../../../../../lib/db";
import { signToken } from "../../../../../lib/auth";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // fetch OTP
    const [rows] = await pool.execute(
      "SELECT id, code, expires_at, used FROM otp_codes WHERE email = ? ORDER BY id DESC LIMIT 1",
      [email]
    );

    if (!rows.length) return NextResponse.json({ error: "OTP not found" }, { status: 400 });

    const otp = rows[0];

    if (otp.used) return NextResponse.json({ error: "OTP already used" }, { status: 400 });

    const now = new Date();
    const expiresAt = new Date(otp.expires_at);
    if (expiresAt < now) return NextResponse.json({ error: "OTP expired" }, { status: 400 });

    if (String(otp.code) !== String(code)) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    // mark used
    await pool.execute("UPDATE otp_codes SET used = 1 WHERE id = ?", [otp.id]);
    await pool.execute("INSERT IGNORE INTO users (email) VALUES (?)", [email]);

    // sign token
    const token = signToken({ email });

    // set httpOnly cookie
    const cookie = serialize("ms_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 
    });

    const res = NextResponse.json({ message: "Verified" });
    res.headers.append("Set-Cookie", cookie);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
