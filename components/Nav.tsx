/**
 * Renders the navigation component for the blog platform.
 * @returns The rendered navigation component.
 */

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
import { ChevronDown, LogOut, PenSquare } from "lucide-react";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  return (
    <>
      {pathname === "/signin" || pathname === "/signup" ? null : (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-center bg-white drop-shadow-md">
          <div className="flex w-full max-w-7xl justify-between px-8 py-3 ">
            <Link
              href="/"
              className="flex w-fit items-center justify-start gap-1"
            >
              <Image src={Logo} alt="logo" width={20} />
              <h1 className="text-lg font-bold">Blog Platform</h1>
            </Link>
            {session.data ? (
              <div className="flex items-center justify-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center justify-center gap-1">
                      <div className="relative aspect-square w-10 overflow-hidden rounded-full">
                        <Image src={profile} alt="profile" fill sizes="100%" />
                      </div>
                      <ChevronDown width={20} className="text-gray-400" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-5">
                    <DropdownMenuLabel>
                      Hello! {session.data.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/write")}>
                      <PenSquare className="mr-2 aspect-square w-4" />
                      Write a post
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        signOut({
                          redirect: false,
                        }).then(() => {
                          router.push("/");
                        });
                      }}
                    >
                      <LogOut className="mr-2 aspect-square w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                className="h-7 rounded-full px-3 py-1"
                onClick={() => router.push("/signin")}
              >
                Sign in
              </Button>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
