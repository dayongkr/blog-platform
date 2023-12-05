import BgImage from "@/public/gifts.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function SignIn() {
  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <div className="flex border-2 border-gray-100 rounded-xl p-10 flex-col gap-8 text-center">
        <div>
          <h1 className="text-3xl font-bold px-10">Welcome back!</h1>
          <p className="text-sm text-gray-400">Please enter your details</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button className="w-full rounded-full mt-3">Sign in</Button>
          <p className="text-sm text-gray-400">
            Don&rsquo;t have an account?{" "}
            <Link className="text-gray-600" href={"signup"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
