import { Suspense } from "react";
import PaymentClient from "@/components/PaymentClient/PaymentClient";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <PaymentClient />
    </Suspense>
  );
}
