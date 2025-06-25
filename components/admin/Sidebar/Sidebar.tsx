import React from "react";
import { Rakkas } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const rakkas = Rakkas({
  variable: "--font-rakkas",
  weight: ["400"],
  subsets: ["latin"],
});

const Sidebar = () => {
  return (
    <div className="w-16 md:w-64 bg-[#080911] min-h-screen py-6 flex flex-col justify-between">
      {/* Top Section with Logo */}
      <div className="flex flex-col items-center md:items-start px-4 space-y-6">
        <div className="flex items-center space-x-2">
          <h1
            className={`${rakkas.className} hidden md:block text-white text-xl`}
          >
            Donghua
          </h1>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </div>

        {/* Navigation */}
        <ul className="space-y-4 w-full">
          <li>
            <Link
              href="/admin/movies"
              className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors px-2 md:px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              <Image
                src="/admin/movies.svg"
                alt="Movies"
                width={24}
                height={24}
              />
              <span className="hidden md:inline">Movies</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors px-2 md:px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              <Image
                src="/admin/users.svg"
                alt="Users"
                width={24}
                height={24}
              />
              <span className="hidden md:inline">Users</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
