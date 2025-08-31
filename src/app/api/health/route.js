import { pool } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [result] = await pool.execute('SELECT 1 as test');

        const [tables] = await pool.execute('SHOW TABLES LIKE "schools"');

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

        return NextResponse.json({
            status: 'healthy',
            database: 'connected',
            tablesExist: tables.length > 0,
            environment: envCheck
        });
    } catch (error) {
        return NextResponse.json({
            status: 'unhealthy',
            error: error.message,
            code: error.code,
            errno: error.errno
        }, { status: 500 });
    }
}