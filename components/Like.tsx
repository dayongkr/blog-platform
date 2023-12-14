"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

interface LikeProps {
  like: { User: { email: string } }[];
  session: Session | null;
  postId: number;
}

export default function Like({ like, session, postId }: LikeProps) {
  const [likes, setLikes] = useState(like ? like.length : 0);
  const { toast } = useToast();
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
          like.splice(
            like.findIndex((item) => item.User.email === session.user?.email),
            1,
          );
        }
      });
    } else {
      fetch("/api/post/like", {
        method: "POST",
        body: JSON.stringify({ postId, email: session.user.email }),
        cache: "no-cache",
      }).then((res) => {
        if (res.ok) {
          setLikes(likes + 1);
          like.push({ User: { email: session.user?.email as string } });
        }
      });
    }
  };
  return (
    <div className="flex justify-center">
      <Button className="w-fit" onClick={onClickLike}>
        <Heart width={15} className="mr-1" />
        {likes}
      </Button>
    </div>
  );
}
