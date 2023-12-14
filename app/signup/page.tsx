"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Logo from "@/public/bookmark.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

export default function SignUp() {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const { toast } = useToast();

  const schema = {
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be 8 characters" }),
  };

  const handleValidation = (
    type: "name" | "email" | "password",
    target: string,
  ) => {
    const result = schema[type].safeParse(target);
    if (result.success) {
      setError((prev) => ({ ...prev, [type]: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        [type]: result.error.issues[0].message,
      }));
    }
    return result.success;
  };

  const onClickSignUp = () => {
    const { name, email, password } = input;
    let isValid = true;

    isValid = handleValidation("name", input.name) && isValid;
    isValid = handleValidation("email", input.email) && isValid;
    isValid = handleValidation("password", input.password) && isValid;

    setLoading(true);
    if (!isValid) {
      setLoading(false);
      return;
    }
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      cache: "no-cache",
    }).then((res) => {
      if (res.status === 200) {
        router.push("/signin");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.json().then((data) => data.message),
        });
        setLoading(false);
      }
    });
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "name" | "email" | "password",
  ) => {
    setInput((prev) => ({ ...prev, [type]: e.target.value }));
    handleValidation(type, e.target.value);
  };

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
              value={input.name}
              onChange={(e) => onChangeInput(e, "name")}
            />
            <Label className="text-left text-xs text-red-500" htmlFor="name">
              {error.name}
            </Label>
          </div>
          <div className="flex w-full flex-col">
            <Label className="text-left text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              placeholder="example@gmail.com"
              id="email"
              value={input.email}
              onChange={(e) => onChangeInput(e, "email")}
            />
            <Label className="text-left text-xs text-red-500" htmlFor="email">
              {error.email}
            </Label>
          </div>
          <div className="flex w-full flex-col">
            <Label className="text-left text-sm" htmlFor="Password">
              Password
            </Label>
            <Input
              placeholder="Password"
              id="Password"
              type="password"
              value={input.password}
              onChange={(e) => onChangeInput(e, "password")}
            />
            <Label
              className="text-left text-xs text-red-500"
              htmlFor="password"
            >
              {error.password}
            </Label>
          </div>
          <Button
            className="mt-3 w-full rounded-full"
            onClick={onClickSignUp}
            disabled={loading}
          >
            {loading && <ClipLoader color="white" size={20} className="mr-3" />}
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
