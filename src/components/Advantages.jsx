import React from "react";
import {
  FaTruckFast,
  FaShieldHalved,
  FaTags,
  FaCreditCard,
} from "react-icons/fa6";

const defaultAdvantages = [
  {
    id: 1,
    icon: FaTruckFast,
    title: "Express Delivery",
    description: "Ships in 24 Hours",
  },
  {
    id: 2,
    icon: FaShieldHalved,
    title: "Brand Warranty",
    description: "100% Original products",
  },
  {
    id: 3,
    icon: FaTags,
    title: "Exciting Deals",
    description: "On all prepaid orders",
  },
  {
    id: 4,
    icon: FaCreditCard,
    title: "Secure Payments",
    description: "SSL / Secure certificate",
  },
];

function Advantages({ items = defaultAdvantages }) {
  return (
    <section className="w-full bg-[#141414] px-5 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Centered Heading */}
        <h2 className="mb-16 text-center text-2xl font-bold tracking-tight text-[#a8b1c5] sm:mb-20 sm:text-3xl">
          Our Advantages
        </h2>

        {/* 4 Benefits Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            const description = item.description || item.info;

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 sm:gap-5 justify-start lg:justify-center"
              >
                {/* Red Icon to the left */}
                {React.isValidElement(Icon) ? (
                  <span
                    className="shrink-0 text-3xl sm:text-4xl text-[#e10600]"
                    aria-hidden="true"
                  >
                    {Icon}
                  </span>
                ) : typeof Icon === "function" ? (
                  <Icon
                    className="shrink-0 text-[#e10600]"
                    size={36}
                    aria-hidden="true"
                  />
                ) : null}

                {/* Title and Description */}
                <div className="min-w-0">
                  <h3 className="whitespace-nowrap text-base font-bold text-[#a8b1c5] sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-1 whitespace-nowrap text-sm text-[#858b9a]">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Advantages;
