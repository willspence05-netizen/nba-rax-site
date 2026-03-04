import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Real Sports RAX",
  description: "NBA RAX Leaderboards"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">

        {/* NAVBAR */}

        <nav className="bg-slate-900 border-b border-slate-700 p-4 flex justify-center">

          <div className="w-[65%] flex justify-between items-center">

            <h1 className="font-bold text-xl">
              Real Sports RAX
            </h1>

            <div className="flex gap-6">

              <Link href="/leaderboard">
                NBA Teams
              </Link>

              <Link href="/players">
                NBA Players
              </Link>

            </div>

          </div>

        </nav>

        {children}

      </body>
    </html>
  );
}