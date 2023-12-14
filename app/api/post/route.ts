import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

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
            }
          }
        },
      }
    },
  });
  return Response.json(post);
}