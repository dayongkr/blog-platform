import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    take: 8,
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
  return Response.json(posts);
}