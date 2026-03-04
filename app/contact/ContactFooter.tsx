import Link from "next/link";

export const SubPageFooter = () => {
  return (
    <div className="mt-8 text-center text-xs text-gray-400">
      ※ 送信内容はGoogleフォームを経由して管理者に届きます。
      <br />※ 個人情報は
      <Link href="/privacy" className="underline hover:text-cyan-300">
        プライバシーポリシー
      </Link>
      に基づき管理されます。
    </div>
  );
};
