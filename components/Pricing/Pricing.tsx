"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    title: "1 Month",
    price: "10000",
    display: "Rp10.000",
    duration: "/month",
  },
  {
    title: "3 Months",
    price: "30000",
    display: "Rp30.000",
    duration: "/month",
  },
  {
    title: "5 Months",
    price: "50000",
    display: "Rp50.000",
    duration: "/month",
  },
];

const features = [
  "Jasa yang disediakann",
  "Jasa yang disediakann",
  "Jasa yang disediakann",
  "Jasa yang disediakann",
  "Jasa yang disediakann",
  "Jasa yang disediakann",
  "Jasa yang disediakann",
];

const SubscriptionPlans = () => {
  const router = useRouter();

  return (
    <section className="py-12 px-4 text-white " id="subscription-plans">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Subscriptions Plan
      </h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {plans.map((plan, index) => {
          const isMiddle = index === 1;

          return (
            <div
              key={index}
              className={`relative bg-[#1c1c1c] rounded-xl px-6 py-6 flex flex-col items-center justify-between transition-all
                ${isMiddle ? "scale-105 md:scale-110 py-8" : ""}
                w-full max-w-xs mx-auto
                shadow-[0_10px_40px_rgba(0,0,0,0.8)]`}
            >
              {/* Spotlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300 blur-2xl opacity-10 rounded-full pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col items-center w-full">
                <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                <p className="text-2xl font-bold text-center">
                  {plan.display}
                  <span className="text-sm font-normal">{plan.duration}</span>
                </p>

                <button
                  onClick={() =>
                    router.push(
                      `/payment?plan=${encodeURIComponent(plan.title)}&price=${
                        plan.price
                      }`
                    )
                  }
                  className="mt-4 mb-6 bg-yellow-400 text-black font-semibold py-2 px-6 rounded w-full hover:bg-yellow-300 transition hover:cursor-pointer"
                >
                  Subscribe →
                </button>

                <ul className="space-y-2 w-full">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <FaCheckCircle className="text-white text-xs" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
