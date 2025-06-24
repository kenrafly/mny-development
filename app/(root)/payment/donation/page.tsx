"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const DonationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") ?? "Unknown Plan";
  const rawPrice = searchParams.get("price") ?? "0";
  const method = searchParams.get("method") ?? "QRIS";

  const price = parseInt(rawPrice) || 0;
  const adminFee = 1000;

  const [donation, setDonation] = useState<number>(0);
  const [customActive, setCustomActive] = useState(false);

  const donationOptions = [
    0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
  ];

  const formatIDR = (value: number): string =>
    new Intl.NumberFormat("id-ID").format(value);

  const handleSelect = (amount: number) => {
    setCustomActive(false);
    setDonation(amount);
  };

  const handleNext = () => {
    const query = new URLSearchParams({
      plan,
      price: price.toString(),
      method,
      donation: donation.toString(),
    }).toString();

    router.push(`/payment/confirm?${query}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 pt-20">
      <div className="bg-[#1c1c1c] p-6 rounded w-[90%] max-w-sm shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Donation</h1>
        <p className="text-sm text-gray-400 mb-4 text-center">
          Support us with a small donation (optional)
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {donationOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => handleSelect(amount)}
              className={`py-2 text-sm rounded transition font-medium ${
                !customActive && donation === amount
                  ? "bg-yellow-400 text-black"
                  : "bg-[#121212] text-white"
              }`}
            >
              {amount === 0 ? "No Donation" : `Rp ${formatIDR(amount)}`}
            </button>
          ))}

          <button
            onClick={() => {
              setCustomActive(true);
              setDonation(0);
            }}
            className={`py-2 text-sm rounded transition font-medium ${
              customActive
                ? "bg-yellow-400 text-black"
                : "bg-[#121212] text-white"
            }`}
          >
            Custom Amount
          </button>
        </div>

        {customActive && (
          <input
            type="number"
            min={0}
            step={1000}
            placeholder="Enter custom donation (e.g. 25000)"
            className="w-full p-2 text-white rounded mb-4"
            value={donation}
            onChange={(e) => setDonation(Number(e.target.value))}
          />
        )}

        <div className="text-sm mb-4 text-center space-y-1">
          <p>
            Base Price:{" "}
            <span className="font-semibold">Rp {formatIDR(price)}</span>
          </p>
          <p>
            Admin Fee:{" "}
            <span className="font-semibold">Rp {formatIDR(adminFee)}</span>
          </p>
          <p>
            Donation:{" "}
            <span className="font-semibold">Rp {formatIDR(donation)}</span>
          </p>
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Total: Rp {formatIDR(price + adminFee + donation)}
          </p>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default DonationClient;
