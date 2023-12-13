import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const noto = Noto_Sans({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog platform",
  description: "Blog platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className={noto.className}>
        <div className="flex justify-center">
          <div className="max-w-7xl w-full">
            <Nav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
