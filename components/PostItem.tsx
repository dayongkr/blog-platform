/**
 * Renders a single post item.
 *
 * @component
 * @param {number} id - The ID of the post.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the post.
 * @param {string} date - The date of the post.
 * @param {string} author - The author of the post.
 * @param {number} likes - The number of likes on the post.
 * @param {number} comments - The number of comments on the post.
 * @returns {JSX.Element} The rendered post item.
 */

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
    <Link
      href={`/posts/${id}`}
      className="duration-500 ease-in-out hover:-translate-y-3"
    >
      <Card className="overflow-hidden">
        <div className="flex aspect-video w-full flex-col items-center justify-center bg-slate-700 text-center text-lg font-bold text-white">
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
