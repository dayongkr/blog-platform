"use client";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/bookmark.png";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import profile from "@/public/p.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

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
              <div className="flex items-center justify-center gap-5">
                <Button
                  className="h-7 rounded-full px-3 py-1"
                  onClick={() => router.push("write")}
                >
                  Post
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="relative aspect-square w-10 overflow-hidden rounded-full">
                      <Image src={profile} alt="profile" fill />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-5">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        signOut();
                      }}
                    >
                      <LogOut className="mr-2 aspect-square w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
