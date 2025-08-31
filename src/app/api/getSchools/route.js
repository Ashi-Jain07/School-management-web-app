// import { pool } from "../../../../lib/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const [rows] = await pool.query("SELECT * FROM schools");
//     return NextResponse.json(rows);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { pool } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('Attempting to fetch schools...');
    
    // Test connection first
    await pool.execute('SELECT 1');
    console.log('Database connection successful');
    
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
    console.log(`Fetched ${rows.length} schools`);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error in getSchools:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      stack: error.stack
    });
    
    return NextResponse.json({ 
      error: "Failed to fetch schools",
      details: process.env.NODE_ENV === 'development' ? error.message : 'Database connection error'
    }, { status: 500 });
  }
}