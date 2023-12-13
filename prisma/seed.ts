import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);
  // Create users
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: [
      { email: 'jane.doe@example.com', name: 'Jane Doe', password: password },
      { email: 'john.smith@example.com', name: 'John Smith', password: password },
      { email: 'emily.johnson@example.com', name: 'Emily Johnson', password: password },
      { email: 'michael.brown@example.com', name: 'Michael Brown', password: password },
      { email: 'sophia.lee@example.com', name: 'Sophia Lee', password: password },
      { email: 'liam.wilson@example.com', name: 'Liam Wilson', password: password },
      { email: 'emma.davis@example.com', name: 'Emma Davis', password: password },
      { email: 'oliver.martinez@example.com', name: 'Oliver Martinez', password: password }
    ],
    skipDuplicates: true, // Skip if user already exists
  });

  const users = await prisma.user.findMany();

  await prisma.post.deleteMany();
  // Create posts
  await prisma.post.createMany({
    data: [
      {
        title: "Exploring the Depths of the Ocean",
        content: `<p><strong>Author:</strong> Jane Doe<br><strong>Date:</strong> 2023-12-10<br><strong>Likes:</strong> 120<br><strong>Comments:</strong> 30</p><p>A deep dive into the mysteries of the underwater world.</p><hr><h3>Description</h3><p>In this fascinating article, we explore the vast and mysterious world beneath the ocean's surface...</p>`,
        description: "In this fascinating article, we explore the vast and mysterious world beneath the ocean's surface...",
        authorId: users[0].id,
      },
      {
        title: "The Future of Renewable Energy",
        content: `<p><strong>Author:</strong> John Smith<br><strong>Date:</strong> 2023-12-08<br><strong>Likes:</strong> 95<br><strong>Comments:</strong> 45</p><p>An analysis of emerging trends in sustainable power sources.</p><hr><h3>Description</h3><p>Renewable energy is rapidly transforming the global landscape...</p>`,
        description: "Renewable energy is rapidly transforming the global landscape...",
        authorId: users[1].id,
      },
      {
        title: "Culinary Journey: Traditional Italian Cuisine",
        content: `<p><strong>Author:</strong> Emily Johnson<br><strong>Date:</strong> 2023-12-05<br><strong>Likes:</strong> 150<br><strong>Comments:</strong> 60</p><p>A taste of Italy through its rich and diverse food culture.</p><hr><h3>Description</h3><p>Italian cuisine has a rich history that spans centuries...</p>`,
        description: "Italian cuisine has a rich history that spans centuries...",
        authorId: users[2].id,
      },
      {
        title: "Advancements in Artificial Intelligence",
        content: `<p><strong>Author:</strong> Michael Brown<br><strong>Date:</strong> 2023-12-03<br><strong>Likes:</strong> 180<br><strong>Comments:</strong> 75</p><p>Exploring the latest breakthroughs in AI technology.</p><hr><h3>Description</h3><p>The world of artificial intelligence (AI) is evolving at an unprecedented pace...</p>`,
        description: "The world of artificial intelligence (AI) is evolving at an unprecedented pace...",
        authorId: users[3].id,
      },
      {
        title: "The Art of Minimalist Living",
        content: `<p><strong>Author:</strong> Sophia Lee<br><strong>Date:</strong> 2023-12-01<br><strong>Likes:</strong> 110<br><strong>Comments:</strong> 40</p><p>Discovering the joys and challenges of a minimalist lifestyle.</p><hr><h3>Description</h3><p>Minimalism is more than just a design principle...</p>`,
        description: "Minimalism is more than just a design principle...",
        authorId: users[4].id,
      },
      {
        title: "Journey Through the Ancient Cities",
        content: `<p><strong>Author:</strong> Liam Wilson<br><strong>Date:</strong> 2023-11-28<br><strong>Likes:</strong> 200<br><strong>Comments:</strong> 85</p><p>A travelogue exploring the world's oldest and most historic cities.</p><hr><h3>Description</h3><p>Embark on a journey through time as we explore ancient cities around the globe...</p>`,
        description: "Embark on a journey through time as we explore ancient cities around the globe...",
        authorId: users[5].id,
      },
      {
        title: "The Science of Happiness",
        content: `<p><strong>Author:</strong> Emma Davis<br><strong>Date:</strong> 2023-11-25<br><strong>Likes:</strong> 165<br><strong>Comments:</strong> 50</p><p>Understanding what makes us happy from a psychological perspective.</p><hr><h3>Description</h3><p>Happiness has been a topic of interest among philosophers, psychologists, and even economists for decades...</p>`,
        description: "Happiness has been a topic of interest among philosophers, psychologists, and even economists for decades...",
        authorId: users[6].id,
      },
      {
        title: "Innovations in Green Architecture",
        content: `<p><strong>Author:</strong> Oliver Martinez<br><strong>Date:</strong> 2023-11-22<br><strong>Likes:</strong> 140<br><strong>Comments:</strong> 60</p><p>A look at sustainable building designs and eco-friendly construction methods.</p><hr><h3>Description</h3><p>Green architecture is not just a trend but a necessary shift in the building industry...</p>`,
        description: "Green architecture is not just a trend but a necessary shift in the building industry...",
        authorId: users[7].id,
      }
    ],
    skipDuplicates: true, // Skip if post already exists
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });