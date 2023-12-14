import PostItem from "@/components/PostItem";
import * as dayjs from "dayjs";

interface FetchedPost {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  author: {
    name: string;
  };
  Like: {
    id: string;
  }[];
  Comment: {
    id: string;
  }[];
}

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
  likes: number;
  comments: number;
  author: string;
}

export default async function Home() {
  const posts = await fetch("http://localhost:3000/api/posts", {
    cache: "no-cache",
  }).then((res) =>
    res.json().then((data) => {
      return data.map((post: FetchedPost) => {
        return {
          author: post.author.name,
          id: post.id,
          title: post.title,
          description: post.description,
          date: dayjs.default(post.createdAt).format("DD/MM/YYYY"),
          likes: post.Like ? post.Like.length : 0,
          comments: post.Comment ? post.Comment.length : 0,
        };
      });
    }),
  );
  return (
    <main className="p-8">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((post: Post) => <PostItem key={post.id} {...post} />)}
      </div>
    </main>
  );
}
