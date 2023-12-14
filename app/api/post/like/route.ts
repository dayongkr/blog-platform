import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

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

export async function DELETE(req: NextRequest) {
  const { email, postId } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const post = await prisma.like.delete({
    where: {
      userId_postId: {
        userId: user?.id as number,
        postId: postId,
      },
    },

  });
  return Response.json(post);
}