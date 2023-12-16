/**
 * Component for rendering a like button.
 *
 * @component
 * @example
 * ```tsx
 * <Like like={likeData} session={sessionData} postId={123} />
 * ```
 *
 * @param {Object[]} like - The array of like objects.
 * @param {Object | null} session - The session object.
 * @param {number} postId - The ID of the post.
 * @returns {JSX.Element} The rendered like button component.
 */

"use client";

import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface LikeProps {
  like: { User: { email: string } }[];
  session: Session | null;
  postId: number;
}

export default function Like({ like, session, postId }: LikeProps) {
  const [likes, setLikes] = useState(like ? like.length : 0);
  const { toast } = useToast();
  const router = useRouter();
  const liked = () => {
    if (!session || !session.user) return false;
    return like.some((item) => item.User.email === session.user?.email);
  };
  const onClickLike = () => {
    if (!session || !session.user) {
      toast({
        variant: "destructive",
        description: "You must be sign in to like",
      });
    } else if (like.some((item) => item.User.email === session.user?.email)) {
      fetch("/api/post/like", {
        method: "DELETE",
        body: JSON.stringify({ postId, email: session.user.email }),
        cache: "no-cache",
      }).then((res) => {
        if (res.ok) {
          setLikes(likes - 1);
          router.refresh();
        }
      });
    } else {
      fetch("/api/post/like", {
        method: "POST",
        body: JSON.stringify({ postId, email: session.user.email }),
        cache: "no-cache",
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          setLikes(likes + 1);
          router.refresh();
        }
      });
    }
  };
  return (
    <div className="flex justify-center">
      <Button className="w-fit" onClick={onClickLike}>
        {liked() ? (
          <RiHeartFill width={15} className="mr-1" />
        ) : (
          <RiHeartLine width={15} className="mr-1" />
        )}
        {likes}
      </Button>
    </div>
  );
}
