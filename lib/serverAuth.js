import { verifyToken } from "./auth";

function getTokenFromReq(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.split(";").map(s => s.trim()).find(s => s.startsWith("ms_auth="));
  if (!match) return null;
  return match.split("=")[1];
}

const token = getTokenFromReq(req);
const payload = verifyToken(token);
if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });