import { Button } from "@/components/ui/button";
import * as dayjs from "dayjs";
import { Heart } from "lucide-react";
import { getServerSession } from "next-auth";
import Comment from "@/components/Comment";
import Like from "@/components/Like";

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const {
    id,
    title,
    content,
    createdAt,
    author: { name },
    Like: like,
    Comment: comments,
  } = await fetch(
    `http://localhost:3000/api/post?` + new URLSearchParams({ id: params.id }),
    {
      cache: "no-cache",
    },
  ).then((res) => res.json());
  const session = await getServerSession();
  return (
    <div className="flex w-full max-w-2xl flex-col justify-center gap-8 py-20">
      <header className="flex flex-col gap-8">
        <h1 className="break-all text-5xl font-bold">{title}</h1>
        <p className="text-sm font-bold">
          {name}
          <span className="font-normal text-gray-400">
            {" "}
            · {dayjs.default(createdAt).format("DD/MM/YYYY")}
          </span>
        </p>
      </header>
      <article
        dangerouslySetInnerHTML={{ __html: content }}
        className="w-ful prose prose-lg border-y border-y-gray-200 py-8"
      />
      <Like like={like} session={session} postId={id} />
      <Comment comment={comments} />
    </div>
  );
}
