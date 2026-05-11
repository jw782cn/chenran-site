import { NextResponse } from "next/server";

const COOKIE_NAME = "share_docs_access";

export async function POST(request: Request) {
  const expectedPassword = process.env.SHARE_DOCS_PASSWORD;
  const accessToken = process.env.SHARE_DOCS_ACCESS_TOKEN;

  if (!expectedPassword || !accessToken) {
    return NextResponse.json({ error: "共享密码尚未配置" }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password.trim() : "";

  if (password !== expectedPassword) {
    return NextResponse.json({ error: "密码不正确" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14,
    path: "/share",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
