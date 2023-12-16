/**
 * Represents a comment component.
 * @component
 *
 * @param {Object[]} comment - The list of comments.
 * @param {string} comment[].id - The unique identifier of the comment.
 * @param {string} comment[].content - The content of the comment.
 * @param {string} comment[].createdAt - The creation date of the comment.
 * @param {Object} comment[].author - The author of the comment.
 * @param {string} comment[].author.name - The name of the comment author.
 * @param {string} comment[].author.email - The email of the comment author.
 * @param {number} postId - The ID of the post.
 * @param {Object | null} session - The user session object.
 *
 * @returns {JSX.Element} The comment component.
 */

"use client";
import { Textarea } from "@/components/ui/textarea";
import CommentItem from "@/components/CommentItem";
import { Button } from "./ui/button";
import * as dayjs from "dayjs";
import { useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
interface FetchedComment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
}

interface CommentProps {
  comment: FetchedComment[];
  postId: number;
  session: Session | null;
}

export default function Comment({ comment, postId, session }: CommentProps) {
  const [content, setContent] = useState("");
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center gap-5">
      <h2 className="w-full font-bold">{comment.length} Comments</h2>
      <div className="flex flex-col items-end  gap-5">
        <Textarea
          placeholder="Write a comment..."
          className="resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={() => {
            if (content && session) {
              fetch("/api/post/comment", {
                method: "POST",
                body: JSON.stringify({
                  content,
                  postId,
                  email: session.user?.email,
                }),
                cache: "no-cache",
              })
                .then((res) => res.json())
                .then((res) => {
                  setContent("");
                  router.refresh();
                })
                .catch((err) => console.log(err));
            }
          }}
          disabled={!session}
        >
          Write a Comment
        </Button>
      </div>
      {comment &&
        comment.map((comment: FetchedComment) => (
          <CommentItem
            id={comment.id}
            content={comment.content}
            date={dayjs.default(comment.createdAt).format("DD/MM/YYYY")}
            name={comment.author.name}
            email={comment.author.email}
            key={comment.id}
            session={session}
          />
        ))}
    </div>
  );
}
