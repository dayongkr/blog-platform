import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

/**
 * Handles the authentication request.
 * 
 * @param {import("next-auth").NextAuthOptions} options - The options for NextAuth.
 * @returns {import("next").NextApiHandler} - The Next.js API handler.
 */
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
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } }); // Find user by email
        if (!user) return null;  // Return null if user not found
        const isValid = user.password === await bcrypt.hash(credentials?.password as string, process.env.NEXTAUTH_SECRET as string); // Compare passwords
        if (!isValid) return null; // Return null if passwords don't match
        return { ...user, id: user.id.toString() }; // Convert id to string
      }
    })],
})

export { handler as GET, handler as POST }