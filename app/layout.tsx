import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import Session from "@/components/Session";

const noto = Noto_Sans({ weight: ["400", "700"], subsets: ["latin"] });
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog platform",
  description: "Blog platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="kr">
      <body className={noto.className}>
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <Session session={session}>
              <Nav />
              <main className="flex w-full flex-col items-center px-8">
                {children}
              </main>
            </Session>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
