import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

/**
 * Handles the POST request to like a post.
 * 
 * @param req - The NextRequest object containing the request details.
 * @returns A JSON response containing the created like object.
 */
export async function POST(req: NextRequest) {
  const { email, postId } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const post = await prisma.like.create({
    data: {
      userId: user?.id as number,
      postId: postId,
    },
  });
  return Response.json(post);
}

/**
 * Deletes a like for a post.
 * 
 * @param req - The request object.
 * @returns A JSON response containing the deleted post.
 */
export async function DELETE(req: NextRequest) {
  const { email, postId } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const post = await prisma.like.delete({
    where: {
      // @ts-ignore
      userId_postId: {
        userId: user?.id as number,
        postId: postId,
      },
    },

  });
  return Response.json(post);
}