"use client";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/bookmark.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  return (
    <>
      {pathname === "/signin" || pathname === "/signup" ? null : (
        <nav className="flex items-center justify-between px-8 py-3">
          <Link
            href="/"
            className="flex w-fit items-center justify-start gap-1"
          >
            <Image src={Logo} alt="logo" width={20} />
            <h1 className="text-lg font-bold">Blog Platform</h1>
          </Link>
          {session.data ? (
            pathname !== "/write" && (
              <Button
                className="h-7 rounded-full px-3 py-1"
                onClick={() => router.push("write")}
              >
                Post
              </Button>
            )
          ) : (
            <Button
              className="h-7 rounded-full px-3 py-1"
              onClick={() => router.push("signin")}
            >
              Sign in
            </Button>
          )}
        </nav>
      )}
    </>
  );
}
