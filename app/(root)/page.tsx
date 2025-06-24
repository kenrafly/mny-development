import React from "react";
import Hero from "@/components/Hero/Hero";
import Top10Movies from "@/components/Top10Movies/Top10Movies";
import AllDonghuasGrid from "@/components/List/List";
import Footer from "@/components/Footer/Footer";
import SubscriptionPlans from "@/components/Pricing/Pricing";
import Navbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Top10Movies />
      <SubscriptionPlans />
      <AllDonghuasGrid />
      <Footer />
    </div>
  );
};

export default page;
