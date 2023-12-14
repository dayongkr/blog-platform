import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";

interface PostItemProps {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  likes: number;
  comments: number;
}

export default function PostItem({
  id,
  title,
  description,
  date,
  author,
  likes,
  comments,
}: PostItemProps) {
  return (
    <Link href={`/posts/${id}`}>
      <Card className="overflow-hidden">
        <div className="flex aspect-video w-full flex-col items-center justify-center bg-gray-700 text-center text-lg font-bold text-white">
          {title}
        </div>
        <CardContent className="flex flex-col gap-1 p-4">
          <h2 className="line-clamp-1 text-xl font-bold ">{title}</h2>
          <p className="line-clamp-2 text-gray-500">{description}</p>
          <div className="mt-5 flex gap-2 text-xs text-gray-400">
            <p>{date}</p>·<p>{comments} comments</p>
          </div>
        </CardContent>
        <CardFooter className="row-end-1 flex w-full items-center justify-between border-t border-t-gray-200 p-3">
          <p className="text-xs text-gray-400">
            by <span className="font-bold text-black">{author}</span>
          </p>
          <p className="text-xs text-gray-400">
            <span className="font-bold text-black">♥️</span> {likes}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
