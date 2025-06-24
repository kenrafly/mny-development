import { Suspense } from "react";
import ConfirmClient from "@/components/ConfirmClient/ConfirmClient";

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <ConfirmClient />
    </Suspense>
  );
}
