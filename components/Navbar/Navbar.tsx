"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Rakkas } from "next/font/google";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

const rakkas = Rakkas({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rakkas",
});

const Navbar = () => {
  const [searchInput, setSearchInput] = useState(false);
  const router = useRouter();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = e.target.value;
    if (path) router.push(path);
  };

  return (
    <nav
      className={`${rakkas.className} border-b border-gray-700 bg-black p-4 px-4  md:px-12 fixed top-0 left-0 w-full z-50`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex hover:cursor-pointer items-center gap-2"
          >
            <h1 className="hidden md:block text-white">Donghua</h1>
            <Image src="/logo.svg" width={40} height={40} alt="" />
          </Link>

          <div className="hidden max-md:flex">
            <select
              onChange={handleSelectChange}
              className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 hover:bg-gray-700 focus:bg-gray-700 focus:text-white transition duration-200"
            >
              <option className="bg-gray-800 text-white" value="">
                Select
              </option>
              <option className="bg-gray-800 text-white" value="/">
                Home
              </option>
              <option className="bg-gray-800 text-white" value="/about-us">
                About Us
              </option>
              <option className="bg-gray-800 text-white" value="/list">
                List
              </option>
            </select>
          </div>
          <div className="hidden md:flex gap-2 pl-4">
            <Link href="/about-us" className="hover:text-yellow-300">
              About Us
            </Link>
            <Link href="/list" className="hover:text-yellow-300">
              List
            </Link>
          </div>
        </div>
        <div className="text-white flex gap-2 items-center">
          {searchInput ? (
            <input
              autoFocus
              type="text"
              onBlur={() => setSearchInput(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const query = (e.target as HTMLInputElement).value;
                  if (query.trim()) {
                    router.push(
                      `/list?search=${encodeURIComponent(query.trim())}`
                    );
                  }
                }
              }}
              className="border border-white p-1 text-white bg-black outline-none"
              placeholder="Search your donghua..."
            />
          ) : (
            <button
              onClick={() => setSearchInput(true)}
              className="hover:cursor-pointer"
            >
              <CiSearch size={24} />
            </button>
          )}
          <ul>
            <a
              className="p-1 px-2 bg-[#D3A900] rounded-sm hover:bg-[#018CEB] duration-200 transition"
              href="#subscription-plans"
            >
              Subscribe
            </a>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
