import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = "share_docs_access";
const LOGIN_PATH = "/share/login";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  const expectedToken = process.env.SHARE_DOCS_ACCESS_TOKEN;
  const currentToken = request.cookies.get(COOKIE_NAME)?.value;

  if (expectedToken && currentToken === expectedToken) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/share/:path*"],
};
