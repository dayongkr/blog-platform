"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Logo from "@/public/bookmark.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card>
        <CardHeader>
          <Link href="/">
            <Image src={Logo} width={30} height={30} alt="logo" />
          </Link>
          <h1 className="text-left text-3xl font-bold">Sign up</h1>
          <p className="text-left text-sm text-gray-400">
            Please enter your details below to create your account and get
            started.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <div className="flex w-full flex-col">
            <Label className="text-left text-sm" htmlFor="name">
              Name
            </Label>
            <Input
              placeholder="Your nickname"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label className="text-left text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              placeholder="example@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="mt-3 w-full rounded-full"
            onClick={() => {
              fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
              });
            }}
          >
            Sign Up
          </Button>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link className="text-gray-600 hover:underline" href={"signin"}>
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
