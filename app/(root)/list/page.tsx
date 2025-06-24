import Footer from "@/components/Footer/Footer";
import AllDonghuasGrid from "@/components/List/List";
import Navbar from "@/components/Navbar/Navbar";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <AllDonghuasGrid />
        <Footer />
      </Suspense>
    </div>
  );
};

export default page;
