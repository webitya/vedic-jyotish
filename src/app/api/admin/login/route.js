import { createHmac } from "crypto";
import { cookies } from "next/headers";

function signToken(username) {
  return createHmac("sha256", process.env.ADMIN_SECRET || "fallback_secret")
    .update(username)
    .digest("hex");
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
      return Response.json(
        { error: "Admin credentials not configured." },
        { status: 500 }
      );
    }

    if (username !== validUser || password !== validPass) {
      return Response.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const token = signToken(username);
    const cookieStore = await cookies();

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
      secure: process.env.NODE_ENV === "production",
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
