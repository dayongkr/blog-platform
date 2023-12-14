"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import Logo from "@/public/bookmark.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card>
        <CardHeader className="flex flex-col items-center ">
          <Link href="/">
            <Image src={Logo} width={30} height={30} alt="logo" />
          </Link>
          <h1 className="px-10 text-3xl font-bold">Welcome back!</h1>
          <p className="text-sm text-gray-400">Please enter your details</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <div className="flex w-full flex-col">
            <Label className="text-left text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              placeholder="example@gmail.com"
              id="email"
              value={email} // Connect input value to email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
          </div>
          <div className="flex w-full flex-col">
            <Label className="text-left text-sm" htmlFor="Password">
              Password
            </Label>
            <Input
              placeholder="Password"
              id="Password"
              type="password"
              value={password} // Connect input value to password state
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            />
          </div>
          <Button
            className="mt-3 w-full rounded-full"
            onClick={() => {
              signIn("credentials", { email, password, redirect: false }).then(
                (res) => {
                  if (res?.ok) {
                    router.push("/");
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Uh oh! Something went wrong",
                      description: "Please check your Email and Password",
                    });
                  }
                },
              );
            }}
          >
            Sign in
          </Button>
          <p className="text-sm text-gray-400">
            Don&rsquo;t have an account?{" "}
            <Link className="text-gray-600 hover:underline" href={"signup"}>
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
