import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Retrieves a post by its ID along with its author, likes, and comments.
 * @param req - The NextRequest object.
 * @returns A JSON response containing the post data.
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const post = await prisma.post.findUnique({
    where: { id: Number(params.get("id")) },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      Like: {
        select: { User: { select: { email: true } } },
      },
      Comment: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          authorId: true,
          author: {
            select: {
              name: true,
              email: true,
            }
          }
        },
        orderBy: { createdAt: "desc" },
      }
    },
  });
  return Response.json(post);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.comment.deleteMany({
    where: { postId: Number(id) },
  });
  await prisma.like.deleteMany({
    where: { postId: Number(id) },
  });
  const post = await prisma.post.delete({
    where: { id: Number(id) },
  });
  return Response.json(post);
}