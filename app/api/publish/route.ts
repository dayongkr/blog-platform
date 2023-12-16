import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Handles the HTTP POST request for creating a new post.
 * 
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Response object containing the newly created post in JSON format.
 */
export async function POST(req: NextRequest) {
  const { content, title, email, description } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const post = await prisma.post.create({
    data: {
      title,
      content,
      description,
      authorId: user?.id as number,
    },
  });

  return Response.json(post);
}