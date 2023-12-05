"use client";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {pathname === "/signin" ? null : (
        <nav className="flex justify-between items-center px-5 py-3">
          <h1 className="font-bold text-lg">Blog Platform</h1>
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
