import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

/**
 * Handles the POST request to create a new comment for a post.
 * @param req - The NextRequest object containing the request details.
 * @returns A JSON response containing the newly created comment with the author information.
 */
export async function POST(req: NextRequest) {
  const { email, postId, content } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const comment = await prisma.comment.create({
    data: {
      content: content,
      authorId: user?.id as number,
      postId: postId,
    },
  });
  const commentWithAuthor = {
    ...comment,
    author: {
      name: user?.name,
    }
  }
  return Response.json(commentWithAuthor);
}

/**
 * Deletes a comment.
 * @param req - The NextRequest object.
 * @returns A JSON response containing the deleted comment.
 */
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const comment = await prisma.comment.delete({
    where: {
      id
    },
  });
  return Response.json(comment);
}