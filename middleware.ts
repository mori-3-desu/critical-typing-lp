import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Next.js 16はVercel上でもx-nonceヘッダーを自動でスクリプトに適用しないため
  // nonce方式を断念し 'unsafe-inline' を採用する
  // 外部ドメインからのスクリプト読み込み禁止は維持されるため
  // LPとして必要なXSS対策は確保できている
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "media-src 'self'",
    "frame-src https://docs.google.com",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  // 別タブで開いたページから window.opener 経由でこのページを操作されるのを防ぐ
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  // 自サイトのリソースが外部サイトから直接読み込まれるのを防ぐ
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  return response;
}

export const config = {
  matcher: [
    {
      // 静的ファイルにはmiddlewareを走らせない（パフォーマンス最適化）
      source: "/((?!_next/static|_next/image|favicon.ico|icon.svg).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
