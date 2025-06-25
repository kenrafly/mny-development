"use client";
import React, { useEffect, useState } from "react";
import { Rakkas } from "next/font/google";
import Image from "next/image";

interface VideoSlide {
  src: string;
  title: string;
  description: string;
}

const rakkas = Rakkas({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rakkas",
});

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [videoSlides, setVideoSlides] = useState<VideoSlide[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideoSlides(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videoSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videoSlides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [videoSlides]);

  if (videoSlides.length === 0) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <p className="text-white text-lg">Loading...</p>
      </section>
    );
  }

  const currentSlide = videoSlides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden pt-20 pl-4 md:pl-12 text-white">
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
            className="p-2 bg-[#D3A900] w-36 flex items-center justify-center rounded-sm font-bold"
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
