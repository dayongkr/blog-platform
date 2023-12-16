import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

/**
 * Handles the POST request for user signup.
 * 
 * @param req - The request object.
 * @returns A response object indicating the result of the signup process.
 */
export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const emailExists = await prisma.user.findUnique({ where: { email } });
  if (emailExists) return Response.json({ message: "Email already exists" }, { status: 400 });
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, process.env.NEXTAUTH_SECRET as string),
    },
  });
  if (!user) return Response.json({ message: "Error creating user" }, { status: 500 });
  return Response.json({ message: "User created successfully" });
}
