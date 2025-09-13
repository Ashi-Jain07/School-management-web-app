import { NextResponse } from "next/server";
import { pool } from "../../../../../lib/db";
import { initDb, initUser } from "../../../../../lib/initdb.js";

const BREVO_API = "https://api.brevo.com/v3/smtp/email";

export async function POST(req) {
  try {
    await initDb();
    await initUser();
    const { email } = await req.json();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // generate 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));

    // expiry 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // store in DB
    await pool.execute(
      "INSERT INTO otp_codes (email, code, expires_at, used) VALUES (?, ?, ?, 0)",
      [email, code, expiresAt]
    );

    // send via Brevo
    const body = {
      sender: { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL },
      to: [{ email }],
      subject: "Your login code (valid for 10 minutes)",
      htmlContent: `<html><body><p>Your OTP code is <strong>${code}</strong>. It will expire in 10 minutes.</p></body></html>`
    };

    const res = await fetch(BREVO_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo send failed:", res.status, text);
      return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
    }

    return NextResponse.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
