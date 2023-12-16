/**
 * Renders a component that displays extra posts.
 */
"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { FetchedPost, Post } from "@/app/page";
import * as dayjs from "dayjs";
import LoadButton from "./LoadButton";

export default function ExtraPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const searchParams = useSearchParams();
  const offset = searchParams.get("offset") || "0";

  useEffect(() => {
    if (offset === "0") return;
    fetch(
      "http://localhost:3000/api/posts?" +
        new URLSearchParams({
          offset: offset,
        }),
      {
        cache: "no-cache",
      },
    ).then((res) =>
      res.json().then((data) => {
        setPosts((prev) => [
          ...prev,
          ...data.posts.map((post: FetchedPost) => {
            return {
              author: post.author.name,
              id: post.id,
              title: post.title,
              description: post.description,
              date: dayjs.default(post.createdAt).format("DD/MM/YYYY"),
              likes: post.Like ? post.Like.length : 0,
              comments: post.Comment ? post.Comment.length : 0,
            };
          }),
        ]);
        setTotalPosts(data.postsCount);
      }),
    );
  }, [offset]);

  return (
    <>
      {posts && posts.map((post: Post) => <PostItem key={post.id} {...post} />)}
      <LoadButton limit={totalPosts} currentLength={posts.length + 6} />
    </>
  );
}
