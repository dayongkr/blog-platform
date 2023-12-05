"use client";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/bookmark.png";
import Link from "next/link";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {pathname === "/signin" || pathname === "/signup" ? null : (
        <nav className="flex justify-between items-center px-5 py-3">
          <Link
            href="/"
            className="flex w-fit justify-start items-center gap-1"
          >
            <Image src={Logo} alt="logo" width={20} />
            <h1 className="font-bold text-lg">Blog Platform</h1>
          </Link>
          <Button
            className="rounded-full py-1 px-3 h-7"
            onClick={() => router.push("signin")}
          >
            Sign in
          </Button>
        </nav>
      )}
    </>
  );
}
