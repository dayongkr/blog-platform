import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

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
        const isValid = user.password === credentials?.password;
        if (!isValid) return null;
        return user;
      }
    })],
})

export { handler as GET, handler as POST }