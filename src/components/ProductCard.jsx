import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!product) return null;

  const image = product.images?.[0] || product.heroImage;
  const price = product.finalPrice ?? product.price;
  const originalPrice =
    product.originalPrice ?? product.priceBeforeDiscount;
  const rateCount = product.rateCount ?? 5;
  const productLink = `/products/${product.id}`;

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsAdded(true);

    timerRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <article
      id={product.id ? `product-${product.id}` : undefined}
      className="group flex h-full flex-col justify-between border border-[#262626] bg-[#121212] transition-colors duration-200 hover:border-[#383838]"
    >
      {/* Top Section: Image, Rating, Title & Info */}
      <div>
        {/* Product image container with subtle hover scale */}
        <Link
          to={productLink}
          className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-[#121212] p-4 sm:h-52 sm:p-5 cursor-pointer"
        >
          {image && (
            <img
              src={image}
              alt={product.title || "Product image"}
              className="h-full w-full object-contain select-none transition-transform duration-300 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}
        </Link>

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
          <Link to={productLink} className="block">
            <h3
              className="truncate text-sm font-semibold leading-tight text-white transition-colors hover:text-[#e10600] sm:text-base cursor-pointer"
              title={product.title}
            >
              {product.title}
            </h3>
          </Link>

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
          onClick={handleAddToCart}
          className={`w-full cursor-pointer py-2 text-center text-xs font-medium text-white transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 sm:py-2.5 sm:text-sm ${
            isAdded
              ? "bg-green-600 hover:bg-green-700 focus-visible:outline-green-500"
              : "bg-[#e10600] hover:bg-red-700 active:bg-red-800 focus-visible:outline-red-500"
          }`}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
