"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import titlesList from "@/constants/list";

const AllDonghuasGrid = () => {
  const itemsPerPage = 15;
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const [currentPage, setCurrentPage] = useState(1);

  const filteredTitles = titlesList.filter((title) =>
    title.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredTitles.length / itemsPerPage);

  const getDonghuaSrc = (index: number) => {
    return `/allDonghuas/donghua (${index + 1}).jpg`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTitles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm]);

  return (
    <section className="px-12 py-8 text-white pt-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">All Donghuas</h2>
      {searchTerm && (
        <p className="mb-4 text-sm text-yellow-400">
          Showing results for:{" "}
          <span className="font-semibold">{searchTerm}</span>
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {currentItems.map((title, idx) => {
          const originalIndex = titlesList.indexOf(title);
          return (
            <div
              key={`${originalIndex}-${idx}`}
              className="flex flex-col items-center"
            >
              <div className="relative aspect-[2/3] w-full rounded overflow-hidden">
                <Image
                  src={getDonghuaSrc(originalIndex)}
                  alt={title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>
              <p className="mt-2 text-center text-sm text-white line-clamp-2">
                {title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AllDonghuasGrid;
