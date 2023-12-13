import PostItem from "@/components/PostItem";
const posts = [
  {
    id: 1,
    title: "Exploring the Depths of the Ocean",
    description: "A deep dive into the mysteries of the underwater world.",
    date: "2023-12-10",
    author: "Jane Doe",
    likes: 120,
    comments: 30,
  },
  {
    id: 2,
    title: "The Future of Renewable Energy",
    description: "An analysis of emerging trends in sustainable power sources.",
    date: "2023-12-08",
    author: "John Smith",
    likes: 95,
    comments: 45,
  },
  {
    id: 3,
    title: "Culinary Journey: Traditional Italian Cuisine",
    description: "A taste of Italy through its rich and diverse food culture.",
    date: "2023-12-05",
    author: "Emily Johnson",
    likes: 150,
    comments: 60,
  },
  {
    id: 4,
    title: "Advancements in Artificial Intelligence",
    description: "Exploring the latest breakthroughs in AI technology.",
    date: "2023-12-03",
    author: "Michael Brown",
    likes: 180,
    comments: 75,
  },
  {
    id: 5,
    title: "The Art of Minimalist Living",
    description:
      "Discovering the joys and challenges of a minimalist lifestyle.",
    date: "2023-12-01",
    author: "Sophia Lee",
    likes: 110,
    comments: 40,
  },
  {
    id: 6,
    title: "Journey Through the Ancient Cities",
    description:
      "A travelogue exploring the world's oldest and most historic cities.",
    date: "2023-11-28",
    author: "Liam Wilson",
    likes: 200,
    comments: 85,
  },
  {
    id: 7,
    title: "The Science of Happiness",
    description:
      "Understanding what makes us happy from a psychological perspective.",
    date: "2023-11-25",
    author: "Emma Davis",
    likes: 165,
    comments: 50,
  },
  {
    id: 8,
    title: "Innovations in Green Architecture",
    description:
      "A look at sustainable building designs and eco-friendly construction methods.",
    date: "2023-11-22",
    author: "Oliver Martinez",
    likes: 140,
    comments: 60,
  },
];

export default function Home() {
  return (
    <main className="p-8">
      <div className="grid w-full grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    </main>
  );
}
