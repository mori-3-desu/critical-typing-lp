import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic': nonceを持つスクリプトから読み込まれるスクリプトも信頼する
    // → Next.jsが動的にロードするchunkも許可される
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // CSSはinline styleが避けられないケースが多いため unsafe-inline を許容
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    // data: はNext.jsが生成するbase64画像に必要
    "img-src 'self' data:",
    "media-src 'self'",
    // Google Formsのiframe埋め込みを許可
    "frame-src https://docs.google.com",
    "connect-src 'self'",
    // Flashなどの古いプラグインを完全ブロック
    "object-src 'none'",
    // <base>タグによるURLのっとりを防ぐ
    "base-uri 'self'",
    // フォームの送信先を自サイトのみに制限
    "form-action 'self'",
  ].join("; ");

  // x-nonce: layout.tsxでNext.jsのスクリプトにnonceを付与するために渡す
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);
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
