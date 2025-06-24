"use client";
import React, { useEffect, useState } from "react";
import { Rakkas } from "next/font/google";
import Image from "next/image";

const rakkas = Rakkas({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rakkas",
});

const videoSlides = [
  {
    src: "/videos/hero-1.mp4",
    title: "Discover the World of Donghua",
    description:
      "Explore amazing stories in Chinese animation. Dive into a universe where tradition meets innovation, and every frame is a masterpiece. Let yourself be captivated by the vibrant cultures, unique characters, and unforgettable journeys that only Donghua can offer.",
  },
  {
    src: "/videos/hero-2.mp4",
    title: "Unleash Your Imagination",
    description:
      "Journey through epic adventures and stunning visuals. Experience fantastical realms, heroic quests, and breathtaking artistry that push the boundaries of creativity. Donghua invites you to dream bigger and see the world through a new lens.",
  },
  {
    src: "/videos/hero-3.mp4",
    title: "Legends Come to Life",
    description:
      "Experience the power of storytelling through Donghua. Watch ancient myths and modern tales unfold with dynamic animation, rich emotion, and compelling narratives that resonate across generations.",
  },
  {
    src: "/videos/hero-4.mp4",
    title: "Where Art Meets Fantasy",
    description:
      "Watch breathtaking animations from talented creators. Immerse yourself in a fusion of artistic expression and imaginative worlds, where every story is crafted with passion and every scene is a visual feast.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videoSlides.length);
    }, 1000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const currentSlide = videoSlides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden pt-20 pl-4 md:pl-12">
      {/* Background video */}
      <video
        key={currentSlide.src}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={currentSlide.src}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Text content */}
      <div className="relative z-20 flex flex-col justify-center h-full">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 max-w-1/2 ${rakkas.className}`}
        >
          {currentSlide.title}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          {currentSlide.description}
        </p>
        <div className="flex gap-4 mt-6">
          <a
            className="p-2 bg-[#D3A900] w-36 flex items-center justify-center rounded-sm font-bold "
            href="#subscription-plans"
          >
            Subscribe
          </a>
          <button className="p-2 bg-[#018CEB] w-36 flex items-center justify-center rounded-sm font-bold gap-2 hover:cursor-pointer">
            <Image
              src="/info.svg"
              width={20}
              height={20}
              alt=""
              className="text-white"
            />
            <span>More info</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
