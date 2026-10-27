import React from "react";

function ProductCard({ product }) {
  if (!product) return null;

  const image = product.images?.[0] || product.heroImage;
  const price = product.finalPrice ?? product.price;
  const originalPrice =
    product.originalPrice ?? product.priceBeforeDiscount;
  const rateCount = product.rateCount ?? 5;

  return (
    <article className="group flex h-full flex-col justify-between border border-[#262626] bg-[#121212] transition-colors duration-200 hover:border-[#383838]">
      {/* Top Section: Image, Rating, Title & Info */}
      <div>
        {/* Product image container with subtle hover scale */}
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-[#121212] p-4 sm:h-52 sm:p-5">
          {image && (
            <img
              src={image}
              alt={product.title || "Product image"}
              className="h-full w-full object-contain select-none transition-transform duration-300 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        {/* Product details */}
        <div className="px-4 pt-1 sm:px-5">
          {/* Star rating */}
          <div
            className="mb-1.5 flex items-center gap-0.5 text-xs text-[#e10600]"
            aria-label={`${rateCount} out of 5 stars`}
          >
            {Array.from({ length: rateCount }).map((_, index) => (
              <span key={index} aria-hidden="true">
                ★
              </span>
            ))}
          </div>

          {/* Product title */}
          <h3
            className="truncate text-sm font-semibold leading-tight text-white sm:text-base"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Short description */}
          {product.info && (
            <p
              className="mt-1 truncate text-xs text-[#7f8594]"
              title={product.info}
            >
              {product.info}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Section: Divider, Pricing & Add to Cart */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        {/* Divider */}
        <hr className="my-3 border-t border-[#262626] sm:my-3.5" />

        {/* Pricing */}
        <div className="mb-3 flex items-baseline gap-2 sm:mb-4">
          <span className="text-base font-bold tracking-tight text-white sm:text-lg">
            {price != null
              ? `₹${Number(price).toLocaleString("en-IN")}`
              : ""}
          </span>
          {originalPrice != null && (
            <span className="text-xs font-normal text-[#7f8594] line-through sm:text-sm">
              ₹{Number(originalPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <button
          type="button"
          className="w-full cursor-pointer bg-[#e10600] py-2 text-center text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 active:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:py-2.5 sm:text-sm"
          onClick={() => {
            // Cart functionality
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
