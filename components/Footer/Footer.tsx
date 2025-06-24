import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">Donghua</span>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </div>

        {/* Footer Links or Text */}
        <div className="flex flex-wrap gap-4 text-sm md:text-base">
          <Link href="/about-us" className="hover:text-yellow-300">
            About Us
          </Link>
          <Link href="/list" className="hover:text-yellow-300">
            Donghua List
          </Link>
          <Link href="/contact" className="hover:text-yellow-300">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Donghua MnY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
