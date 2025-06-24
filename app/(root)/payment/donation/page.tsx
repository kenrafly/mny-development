import DonationClient from "@/components/donationClient/DonationClient";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>loading.....</div>}>
      <DonationClient />
    </Suspense>
  );
};

export default page;
