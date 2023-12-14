import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
        if (!user) return null;
        console.log(user.password, await bcrypt.hash(credentials?.password as string, process.env.NEXTAUTH_SECRET as string), credentials?.password);
        const isValid = user.password === await bcrypt.hash(credentials?.password as string, process.env.NEXTAUTH_SECRET as string);
        if (!isValid) return null;
        return { ...user, id: user.id.toString() }; // Convert id to string
      }
    })],
})

export { handler as GET, handler as POST }