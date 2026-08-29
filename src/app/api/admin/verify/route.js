import { createHmac } from "crypto";
import { cookies } from "next/headers";

function signToken(username) {
  return createHmac("sha256", process.env.ADMIN_SECRET || "fallback_secret")
    .update(username)
    .digest("hex");
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  const expectedToken = signToken(process.env.ADMIN_USERNAME || "");
  if (session.value !== expectedToken) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  return Response.json({ authenticated: true });
}
