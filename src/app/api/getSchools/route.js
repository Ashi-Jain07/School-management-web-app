import { pool } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await pool.execute('SELECT 1');
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch schools",
      details: process.env.NODE_ENV === 'development' ? error.message : 'Database connection error'
    }, { status: 500 });
  }
}