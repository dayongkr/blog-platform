import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const emailExists = await prisma.user.findUnique({ where: { email } });
  if (emailExists) return Response.json({ message: "Email already exists" }, { status: 400 });
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  if (!user) return Response.json({ message: "Error creating user" }, { status: 500 });
  return Response.json(user, { status: 201 })
}
