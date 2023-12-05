"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import Logo from "@/public/bookmark.png";

export default function SignIn() {
  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <div className="flex border-2 border-gray-100 rounded-xl p-10 flex-col gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <Link href="/">
            <Image src={Logo} width={30} height={30} alt="logo" />
          </Link>
          <h1 className="text-3xl font-bold px-10">Welcome back!</h1>
          <p className="text-sm text-gray-400">Please enter your details</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full flex flex-col">
            <Label className="text-left text-sm" htmlFor="email">
              Email
            </Label>
            <Input placeholder="example@gmail.com" id="email" />
          </div>
          <div className="w-full flex flex-col">
            <Label className="text-left text-sm" htmlFor="Password">
              Password
            </Label>
            <Input placeholder="Password" id="Password" type="password" />
          </div>
          <Button className="w-full rounded-full mt-3">Sign in</Button>
          <p className="text-sm text-gray-400">
            Don&rsquo;t have an account?{" "}
            <Link className="text-gray-600 hover:underline" href={"signup"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
