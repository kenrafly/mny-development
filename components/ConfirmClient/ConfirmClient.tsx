"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

type PaymentInfo = string | { bank: string; number: string };

const staticPaymentInfo: Record<string, PaymentInfo> = {
  qris: "QR CODE",
  dana: "082333248477",
  shopeepay: "082333248477",
  gopay: "082333248477",
  bri: { bank: "BRI", number: "610701030552534" },
  seabank: { bank: "SeaBank", number: "901673343551" },
};

const methodMap: Record<string, string> = {
  QRIS: "qris",
  DANA: "dana",
  ShopeePay: "shopeepay",
  GoPay: "gopay",
  "BANK BRI": "bri",
  SeaBank: "seabank",
};

const formatIDR = (value: number): string =>
  new Intl.NumberFormat("id-ID").format(value);

export default function ConfirmClient() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Unknown Plan";
  const price = parseInt(searchParams.get("price") || "0");
  const donation = parseInt(searchParams.get("donation") || "0");
  const rawMethod = searchParams.get("method") || "QRIS";
  const methodKey = methodMap[rawMethod] || rawMethod.toLowerCase();

  const adminFee = 1000;
  const total = price + adminFee + donation;
  const paymentInfo = staticPaymentInfo[methodKey];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20 px-4">
      <div className="bg-[#1c1c1c] rounded-2xl shadow-xl p-6 w-full max-w-sm text-center border border-gray-700">
        <h1 className="text-2xl font-bold mb-2">Finish payment</h1>
        <p className="text-lg mb-1">
          Plan: <span className="font-semibold">{plan}</span>
        </p>
        <p className="mb-1">
          Price: <span className="font-semibold">Rp {formatIDR(price)}</span>
        </p>
        <p className="mb-1">
          Admin Fee:{" "}
          <span className="font-semibold">Rp {formatIDR(adminFee)}</span>
        </p>
        {donation > 0 && (
          <p className="mb-1">
            Donation:{" "}
            <span className="font-semibold">Rp {formatIDR(donation)}</span>
          </p>
        )}
        <p className="mb-4">
          <strong>Total:</strong>{" "}
          <span className="text-yellow-400 font-bold text-lg">
            Rp {formatIDR(total)}
          </span>
        </p>

        {methodKey === "qris" ? (
          <div className="bg-black p-2 rounded-lg overflow-hidden border border-gray-600 mb-4">
            <Image
              src={`/payment/qris.jpg`}
              alt="QR Code"
              width={300}
              height={300}
              className="rounded"
            />
            <p className="text-sm text-gray-400 mt-4">
              Scan with your QRIS app to complete payment
            </p>
          </div>
        ) : (
          <div className="bg-[#121212] p-4 rounded-lg text-left mb-4 border border-gray-600 text-sm">
            <p className="text-yellow-400 font-semibold mb-2">
              No QR Available
            </p>

            {paymentInfo ? (
              typeof paymentInfo === "string" ? (
                <p>
                  {rawMethod}: <span className="text-white">{paymentInfo}</span>
                </p>
              ) : (
                <>
                  <p>Bank: {paymentInfo.bank}</p>
                  <p>Account: {paymentInfo.number}</p>
                </>
              )
            ) : (
              <p className="text-red-400">
                Payment info not available for {rawMethod}
              </p>
            )}
          </div>
        )}

        <a
          href="https://wa.me/6285137867382"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
        >
          Confirm your payment once done
        </a>
      </div>
    </div>
  );
}
