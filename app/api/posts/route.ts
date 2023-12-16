import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";


/**
 * Retrieves a list of posts with additional information such as author, likes, and comments.
 * @param req - The NextRequest object containing the request details.
 * @returns A JSON response containing the list of posts and the total count of posts.
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const posts = await prisma.post.findMany({
    take: 6,
    skip: Number(Number(params.get("offset") || 0) * 6),
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
      description: true,
      author: {
        select: { name: true },
      },
      Like: {
        select: { userId: true, postId: true },
      },
      Comment: {
        select: { id: true },
      },
    },
  });

  const postsCount = await prisma.post.count();
  return Response.json({ posts, postsCount });
}