"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Top10Movies = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const movies = Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    src: `/top-10/top (${i + 1}).jpg`,
  }));

  return (
    <section className="relative px-12 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Top 10 Donghua on this channel
      </h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scrollable movie list */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
      >
        {movies.map((movie) => (
          <div
            key={movie.rank}
            className="relative w-40 min-w-[160px] md:w-48 md:min-w-[200px] h-[300px] flex-shrink-0 group"
          >
            {/* Rank Number */}
            <div className="absolute left-2 top-2 text-white text-[3rem] font-black opacity-80 z-10 drop-shadow-lg">
              {movie.rank}
            </div>

            {/* Thumbnail Image */}
            <Image
              src={movie.src}
              alt={`Top ${movie.rank}`}
              fill
              className="rounded-md object-cover"
            />

            {/* Optional title */}
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/60 px-2 py-1 rounded">
              Top {movie.rank}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Top10Movies;
