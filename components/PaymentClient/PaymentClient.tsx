"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

interface PaymentMethod {
  name: string;
  file: string;
  color?: string;
}

const payments: PaymentMethod[] = [
  { name: "QRIS", file: "qris.svg", color: "bg-yellow-400" },
  { name: "DANA", file: "dana.svg" },
  { name: "ShopeePay", file: "shopeepay.svg" },
  { name: "GoPay", file: "gopay.svg" },
  { name: "SeaBank", file: "seabank.svg" },
  { name: "BANK BRI", file: "bri.svg" },
];

const PaymentClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "Unknown Plan";
  const rawPrice = searchParams.get("price") ?? "0";

  const price = parseInt(rawPrice) || 0;
  const adminFee = 1000;
  const total = price + adminFee;

  const [selected, setSelected] = useState<string>("QRIS");

  const handlePay = () => {
    const query = new URLSearchParams({
      plan,
      price: price.toString(),
      method: selected,
    }).toString();

    router.push(`/payment/donation?${query}`);
  };

  const formatIDR = (value: number): string =>
    new Intl.NumberFormat("id-ID").format(value);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center pt-20">
      <div className="bg-[#1c1c1c] rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300 blur-2xl opacity-10 rounded-full pointer-events-none z-0" />
        <h1 className="text-2xl font-bold text-center mb-4">
          Payment for {plan}
        </h1>

        <div className="text-lg mb-6 space-y-1 text-center">
          <p>
            Price: <span className="font-semibold">Rp {formatIDR(price)}</span>
          </p>
          <p>
            Admin Fee:{" "}
            <span className="font-semibold">Rp {formatIDR(adminFee)}</span>
          </p>
          <p className="text-yellow-400 font-bold text-xl">
            Total: Rp {formatIDR(total)}
          </p>
        </div>

        <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
        <div className="flex flex-col gap-2">
          {payments.map((method) => {
            const isSelected = selected === method.name;

            return (
              <button
                key={method.name}
                onClick={() => setSelected(method.name)}
                className={`flex justify-between items-center px-4 py-2 rounded transition font-medium
                  ${
                    isSelected
                      ? "bg-yellow-400 text-black"
                      : "bg-[#121212] text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`/payment/${method.file}`}
                    alt={method.name}
                    width={30}
                    height={30}
                  />
                  <span>{method.name}</span>
                </div>
                {isSelected && (
                  <div className="text-black font-bold text-lg">✔</div>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-6 rounded transition"
        >
          Bayar →
        </button>
      </div>
    </div>
  );
};

export default PaymentClient;
