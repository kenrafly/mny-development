import Footer from "@/components/Footer/Footer";
import AllDonghuasGrid from "@/components/List/List";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <AllDonghuasGrid />
      <Footer />
    </div>
  );
};

export default page;
