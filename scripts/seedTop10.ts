// scripts/seedMovies.ts
import "dotenv/config"; // ⬅️ VERY IMPORTANT
import { connectDB } from "../lib/mongoose";
import { Top10 } from "@/lib/models/Top10";

const baseCloudinaryURL =
  "https://res.cloudinary.com/dnfqw9hv8/image/upload/v1750775770/top10";
const movies = [
  {
    rank: 1,
    title: "Wu Dong Qian Kun",
    description: "No description provided.",
    image: "/top-10/top-10 (1).jpg",
  },
  {
    rank: 2,
    title: "The World of Immortals (Chang Sheng Jie)",
    description: "No description provided.",
    image: "/top-10/top-10 (2).jpg",
  },
  {
    rank: 3,
    title: "Battle Through the Heaven",
    description: "No description provided.",
    image: "/top-10/top-10 (3).jpg",
  },
  {
    rank: 4,
    title: "Tales of Herding Gods",
    description: "No description provided.",
    image: "/top-10/top-10 (4).jpg",
  },
  {
    rank: 5,
    title: "Renegade Immortal",
    description: "No description provided.",
    image: "/top-10/top-10 (5).jpg",
  },
  {
    rank: 6,
    title: "Swallowed Star",
    description: "No description provided.",
    image: "/top-10/top-10 (6).jpg",
  },
  {
    rank: 7,
    title: "Shrouding the Heavens",
    description: "No description provided.",
    image: "/top-10/top-10 (7).jpg",
  },
  {
    rank: 8,
    title: "Throne of Seal",
    description: "No description provided.",
    image: "/top-10/top-10 (8).jpg",
  },
  {
    rank: 9,
    title: "Azure Legacy",
    description: "No description provided.",
    image: "/top-10/top-10 (9).jpg",
  },
  {
    rank: 10,
    title: "Soul Land S1 & S2",
    description: "No description provided.",
    image: "/top-10/top-10 (10).jpg",
  },
];

const cloudMovies = movies.map((movie, index) => {
  const imageIndex = index + 1;
  return {
    ...movie,
    image: `${baseCloudinaryURL}/top-10%20%28${imageIndex}%29.jpg`,
  };
});
async function seed() {
  try {
    await connectDB();
    await Top10.deleteMany(); // Optional: Clear old data
    await Top10.insertMany(cloudMovies);
    console.log("✅ Movies seeded successfully with Cloudinary URLs!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed movies:", error);
    process.exit(1);
  }
}

seed();
