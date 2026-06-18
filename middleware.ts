import { NextRequest, NextResponse } from "next/server";

// Define which routes you want to rate limit
export const _config = {
  matcher: "/api/:path*",
};

export default async function middleware(_request: NextRequest) {
  NextResponse.next();
}
