// import { pool } from "../../../lib/db";
import { pool } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('Health check - testing database connection...');
    
    // Test basic connection
    const [result] = await pool.execute('SELECT 1 as test');
    console.log('Basic connection test passed');
    
    // Test schools table exists
    const [tables] = await pool.execute('SHOW TABLES LIKE "schools"');
    console.log('Schools table check:', tables.length > 0 ? 'EXISTS' : 'MISSING');
    
    // Test environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      hasDbHost: !!process.env.DB_HOST,
      hasDbUser: !!process.env.DB_USER,
      hasDbPassword: !!process.env.DB_PASSWORD,
      hasDbName: !!process.env.DB_NAME,
      hasMysqlHost: !!process.env.MYSQLHOST,
      hasMysqlUser: !!process.env.MYSQLUSER,
      hasMysqlPassword: !!process.env.MYSQLPASSWORD,
      hasMysqlDatabase: !!process.env.MYSQLDATABASE,
    };
    
    console.log('Environment variables check:', envCheck);
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      tablesExist: tables.length > 0,
      environment: envCheck
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'unhealthy',
      error: error.message,
      code: error.code,
      errno: error.errno
    }, { status: 500 });
  }
}