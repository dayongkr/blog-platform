import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { randomInt } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Hashing the password
  const password = await bcrypt.hash('password', String(process.env.NEXTAUTH_SECRET).replaceAll('\\', '') as string);

  // Delete existing data
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create 20 users
  const userNames = [
    "John Doe",
    "Jane Doe",
    "Bob Smith",
    "Mary Smith",
    "Michael Johnson",
    "Patricia Johnson",
    "James Williams",
    "Linda Williams",
    "Robert Jones",
    "Elizabeth Jones",
    "William Brown",
    "Jennifer Brown",
    "David Miller",
    "Margaret Miller",
    "Richard Davis",
    "Susan Davis",
    "Joseph Garcia",
    "Maria Garcia",
    "Charles Rodriguez",
    "Nancy Rodriguez"
  ];
  const users = [];
  for (let i = 1; i <= 20; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        name: userNames[i - 1],
        password: password,
      },
    });
    users.push(user);
  }

  // Create 10 posts and for each post, 3-5 comments and 8-17 likes
  const blogPostShortTitles = [
    "Quantum Computing Explained",
    "Smart Farming Revolution",
    "Embracing Minimalism",
    "Space Exploration Today",
    "Electric Vehicles Future",
    "World Cuisine Adventure",
    "AI in Healthcare",
    "Living Sustainably",
    "Social Media Evolution",
    "Renewable Energy Advances"
  ];

  const blogPostDescriptions = [
    "A comprehensive guide into quantum computing, unraveling its complexities and potential impacts on future technology.",
    "An insightful exploration of how smart farming technologies are transforming agricultural practices and enhancing productivity.",
    "Delving into the philosophy of minimalism, discussing its benefits for both personal well-being and environmental sustainability.",
    "A captivating journey through the latest advancements and discoveries in space exploration and astrophysics.",
    "Examining the rapid growth of electric vehicles and their potential to revolutionize the automotive industry.",
    "A gastronomic tour of world cuisines, exploring the rich flavors, history, and cultural significance of various culinary traditions.",
    "An in-depth analysis of artificial intelligence in healthcare, highlighting its advancements, challenges, and future prospects.",
    "Practical tips and strategies for adopting a sustainable lifestyle to effectively reduce your ecological footprint.",
    "Tracing the evolution of social media platforms, from simple communication tools to powerful drivers of commerce and culture.",
    "An overview of the latest breakthroughs in renewable energy, discussing the challenges and innovations shaping this vital sector."
  ];


  for (let i = 1; i <= 10; i++) {
    const post = await prisma.post.create({
      data: {
        title: blogPostShortTitles[i - 1],
        content: `
        <p>In this in-depth article, we explore the fascinating journey of web development technologies from their inception to the modern day. We'll cover key milestones, influential technologies, and predict future trends that could shape the world of web development.</p>
        
        <h2>The Early Days of the Web</h2>
        <p>The story of web development begins with the birth of the World Wide Web. In the early 1990s, web pages were primarily static and built using simple HTML. The introduction of CSS in 1996 allowed developers to improve the presentation of web pages, separating content from design.</p>
        
        <h3>HTML: The Backbone of the Web</h3>
        <p>HTML, or HyperText Markup Language, has been the foundation of web development since the beginning. It provides the basic structure of sites, which is then enhanced and modified by other technologies like CSS and JavaScript.</p>
        <code>&lt;html&gt;&lt;head&gt;&lt;title&gt;Page Title&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;h1&gt;This is a Heading&lt;/h1&gt;&lt;p&gt;This is a paragraph.&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</code>
        
        <h2>The Rise of Dynamic Websites</h2>
        <p>As the internet evolved, so did the technologies. The late 1990s and early 2000s saw a shift towards dynamic websites. Languages like PHP and JavaScript started to gain popularity, allowing for more interactive and personalized user experiences.</p>
        
        <h3>JavaScript: Bringing Interactivity to the Web</h3>
        <p>JavaScript emerged as a powerful tool for making web pages dynamic. It allowed developers to create rich, interactive experiences, and its importance has only grown with time.</p>
        
        <h2>Modern Web Development</h2>
        <p>Today, web development is a complex field with a plethora of technologies at its disposal. Front-end frameworks like React and Vue.js have revolutionized the way user interfaces are built, while back-end development has been transformed by Node.js and Python's Django.</p>
        
        <h3>Front-End Frameworks</h3>
        <p>Frameworks like React have changed the game in front-end development, offering more robust, efficient, and scalable ways to build web applications.</p>
        
        <h3>Back-End Evolution</h3>
        <p>On the server side, Node.js has enabled JavaScript to run on the back end, creating a more unified development experience. Python's Django framework offers a high-level, MVT (Model-View-Template) architecture for building secure and maintainable websites.</p>
        
        <h2>Conclusion</h2>
        <p>The web development landscape continues to evolve at a rapid pace. As new technologies emerge and older ones are phased out, one thing remains constant: the web's endless potential for innovation and growth.</p>
        `,
        description: blogPostDescriptions[i - 1],
        authorId: users[randomInt(0, 20)].id,
      },
    });

    // Create 3-5 comments for each post
    const comments = [
      "Fascinating read! I never realized how much web development has evolved over the years.",
      "Great article! It's interesting to see how JavaScript has become so crucial in modern web development.",
      "I remember when HTML was just about simple text formatting. It's amazing to see its journey.",
      "This really puts the rapid advancement of technology into perspective. Thanks for sharing!",
      "I'd love to see more about the impact of AI in web development. Any thoughts on that?",
      "The section on renewable energy was particularly eye-opening. It's an urgent topic for our times.",
      "Minimalism isn't just a design choice; it's a way of life. This article captures that essence beautifully.",
      "Can you recommend some resources for beginners interested in smart farming technologies?",
      "Electric vehicles are definitely the future. This post highlights the key reasons why.",
      "The exploration of quantum computing is mind-blowing. It's like reading a sci-fi novel!",
      "I think the healthcare industry's transformation through AI is just beginning. Great insights!",
      "Your point about sustainable living is spot on. We all need to play a part in this.",
      "Social media's evolution has been incredible. It's more than just a tool for communication now.",
      "As a web developer, I find this history of web technologies really inspiring.",
      "More posts like this, please! It's important to stay informed about environmental changes."
    ];

    const numberOfComments = randomInt(3, 6); // generates a number between 3 and 5
    for (let j = 0; j < numberOfComments; j++) {
      await prisma.comment.create({
        data: {
          content: `${comments[randomInt(0, 14)]}`,
          postId: post.id,
          authorId: users[randomInt(0, 20)].id,
        },
      });
    }

    // Create 8-17 likes for each post (don't allow duplicate likes)
    const numberOfLikes = randomInt(8, 18); // generates a number between 8 and 17
    const likedBy: number[] = [];
    for (let k = 0; k < numberOfLikes; k++) {
      const user = users[randomInt(0, 20)];
      if (!likedBy.includes(user.id)) {
        await prisma.like.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        });
        likedBy.push(user.id);
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
