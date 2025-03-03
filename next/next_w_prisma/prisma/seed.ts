import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.course.deleteMany({});

  // Create courses
  await prisma.course.createMany({
    data: [
      {
        title: "Introduction to Web Development",
        instructor: "John Doe",
        description: "Learn the basics of HTML, CSS, and JavaScript",
        duration: 20,
      },
      {
        title: "React Fundamentals",
        instructor: "Jane Smith",
        description: "Master the basics of React.js",
        duration: 15,
      },
      {
        title: "Node.js Backend Development",
        instructor: "Bob Wilson",
        description: "Build scalable backend applications with Node.js",
        duration: 25,
      },
    ],
  });

  console.log("Database has been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

