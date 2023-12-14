"use client";
import { Textarea } from "@/components/ui/textarea";
import CommentItem from "@/components/CommentItem";
import { Button } from "./ui/button";
import * as dayjs from "dayjs";

interface FetchedComment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function Comment({ comment }: { comment: FetchedComment[] }) {
  return (
    <div className="flex flex-col justify-center gap-5">
      <h2 className="w-full font-bold">0 Comments</h2>
      <div className="flex flex-col items-end  gap-5">
        <Textarea placeholder="Write a comment..." className="resize-none" />
        <Button>Write a Comment</Button>
      </div>
      {comment &&
        comment.map((comment: FetchedComment) => (
          <CommentItem
            content={comment.content}
            date={dayjs.default(comment.createdAt).format("DD/MM/YYYY")}
            name={comment.author.name}
            key={comment.id}
          />
        ))}
    </div>
  );
}
