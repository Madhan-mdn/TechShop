import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Advantages from "../components/Advantages";
import productsData from "../data/productsData";
import reviewsData from "../data/reviewsData";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // Retrieve product from route param (matched by id or path)
  const product = productsData.find(
    (p) => String(p.id) === String(productId)
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevProductId, setPrevProductId] = useState(productId);
  const [activeTab, setActiveTab] = useState("Specifications");
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef(null);

  // Reset local state during render when route param changes
  if (productId !== prevProductId) {
    setPrevProductId(productId);
    setActiveImageIndex(0);
    setActiveTab("Specifications");
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Not found state
  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col justify-between">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Product Not Found
          </h1>
          <p className="text-sm text-[#a8b1c5] max-w-md mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/products"
            className="bg-[#e10600] hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-semibold py-2.5 px-6 rounded-sm transition-colors cursor-pointer"
          >
            Browse All Products
          </Link>
        </main>
        <Advantages />
        <Footer />
      </div>
    );
  }

  const finalPrice = Number(product.finalPrice ?? product.price ?? 0);
  const originalPrice = Number(
    product.originalPrice ?? product.priceBeforeDiscount ?? finalPrice
  );
  const savings = originalPrice > finalPrice ? originalPrice - finalPrice : 0;
  const discountPercent =
    originalPrice > finalPrice
      ? Math.round((savings / originalPrice) * 100)
      : 0;
  const rateCount = product.rateCount ?? 5;
  const availableImages =
    product.images && product.images.length > 0
      ? product.images
      : product.heroImage
      ? [product.heroImage]
      : [];
  const displayedImage =
    availableImages[activeImageIndex] || availableImages[0] || "";
  const isAvailable = product.quantity == null || product.quantity > 0;

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
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col justify-between">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-[1480px] px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        {/* Top Product Section: Gallery (Left ~44%) & Info (Right ~56%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 items-center sm:items-start justify-center w-full">
            {/* Vertical Thumbnails */}
            {availableImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 sm:gap-3.5 shrink-0 overflow-x-auto sm:overflow-visible max-w-full">
                {availableImages.map((imgSrc, idx) => {
                  const isSelected = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-[82px] lg:w-[82px] rounded-sm border bg-[#121212] p-2 transition-colors cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? "border-white"
                          : "border-[#2a2a2a] hover:border-[#666]"
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        className="h-full w-full object-contain select-none"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Image Display */}
            <div className="relative flex-1 w-full flex items-center justify-center h-[360px] sm:h-[460px] md:h-[520px] lg:h-[580px] xl:h-[620px] bg-transparent p-2 sm:p-4">
              {displayedImage && (
                <img
                  src={displayedImage}
                  alt={product.title}
                  className="h-full w-full max-h-[580px] xl:max-h-[620px] object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] select-none"
                />
              )}
            </div>
          </div>

          {/* Right Column: Product Information */}
          <div className="flex flex-col justify-start">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Subtitle / Description */}
            {product.info && (
              <p className="mt-1.5 text-sm sm:text-base text-[#a8b1c5]">
                {product.info}
              </p>
            )}

            {/* Star Rating & Ratings Count */}
            <div className="mt-3 sm:mt-4 flex items-center gap-2">
              <div
                className="flex items-center gap-0.5 text-sm text-[#e10600]"
                aria-label={`${rateCount} out of 5 stars`}
              >
                {Array.from({ length: rateCount }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <span className="text-[#444] text-xs">|</span>
              <span className="text-xs sm:text-sm text-[#a8b1c5]">
                {product.ratings ?? 1234} Ratings
              </span>
            </div>

            <hr className="my-5 sm:my-6 border-t border-[#262626]" />

            {/* Price Row & In Stock Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3 sm:gap-4">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  ₹{finalPrice.toLocaleString("en-IN")}
                </span>
                {originalPrice > finalPrice && (
                  <span className="text-base sm:text-lg font-normal text-neutral-400 line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* In Stock Badge */}
              {isAvailable && (
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#00a854] px-3 py-1 text-xs font-semibold text-white">
                  ✓ In Stock
                </span>
              )}
            </div>

            {/* Savings & Tax info */}
            {savings > 0 && (
              <p className="mt-2 text-sm sm:text-base font-semibold text-green-500">
                You save: ₹{savings.toLocaleString("en-IN")} ({discountPercent}%)
              </p>
            )}
            <p className="mt-0.5 text-xs text-[#7f8594]">
              (Inclusive of all taxes)
            </p>

            <hr className="my-5 sm:my-6 border-t border-[#262626]" />

            {/* Offers and Discounts */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3">
                Offers and Discounts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-sm border border-[#2a2a2a] bg-[#121212] p-3.5 sm:p-4 text-xs sm:text-sm text-[#a8b1c5]">
                  No Cost EMI on Credit Card
                </div>
                <div className="rounded-sm border border-[#2a2a2a] bg-[#121212] p-3.5 sm:p-4 text-xs sm:text-sm text-[#a8b1c5]">
                  Pay Later & Avail Cashback
                </div>
              </div>
            </div>

            <hr className="my-6 sm:my-7 border-t border-[#262626]" />

            {/* Add to Cart Button */}
            <div>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-48 sm:w-56 py-3.5 sm:py-4 text-center text-sm sm:text-base font-semibold text-white transition-colors duration-300 ease-in-out cursor-pointer rounded-sm ${
                  isAdded
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#e10600] hover:bg-red-700 active:bg-red-800"
                }`}
              >
                {isAdded ? "Added" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Section */}
        <div className="mt-16 sm:mt-20 border-b border-[#262626]">
          <div className="flex items-center justify-center gap-4 sm:gap-10 pb-4">
            {["Specifications", "Overview", "Reviews"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer px-6 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-[#e10600] text-white"
                      : "bg-transparent text-[#a8b1c5] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="py-8 sm:py-10 w-full">
          {/* 1. Specifications Tab */}
          {activeTab === "Specifications" && (
            <div className="w-full space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] py-1">
                <span className="text-[#a8b1c5]">Brand</span>
                <span className="text-white font-medium">
                  {product.brand || "—"}
                </span>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] py-1">
                <span className="text-[#a8b1c5]">Model</span>
                <span className="text-white font-medium">
                  {product.title || "—"}
                </span>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] py-1">
                <span className="text-[#a8b1c5]">Generic Name</span>
                <span className="text-white font-medium">
                  {product.category || "—"}
                </span>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] py-1">
                <span className="text-[#a8b1c5]">Headphone Type</span>
                <span className="text-white font-medium">
                  {product.type || "—"}
                </span>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] py-1">
                <span className="text-[#a8b1c5]">Connectivity</span>
                <span className="text-white font-medium">
                  {product.connectivity || "—"}
                </span>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] py-1">
                <span className="text-[#a8b1c5]">Microphone</span>
                <span className="text-white font-medium">Yes</span>
              </div>
            </div>
          )}

          {/* 2. Overview Tab */}
          {activeTab === "Overview" && (
            <div className="w-full space-y-6 text-xs sm:text-sm text-[#a8b1c5] leading-relaxed">
              <h3 className="text-sm sm:text-base font-medium text-white">
                The{" "}
                <span className="text-[#e10600] font-bold">
                  {product.title}
                </span>{" "}
                {product.info} provides with fabulous sound quality
              </h3>

              <ul className="space-y-2 text-[#a8b1c5]">
                <li>• Sound Tuned to Perfection</li>
                <li>• Comfortable to Wear</li>
                <li>• Long Hours Playback Time</li>
              </ul>

              <p>
                Buy the{" "}
                <span className="text-white font-semibold">
                  {product.title} {product.info}
                </span>{" "}
                which offers you with fabulous music experience by providing you
                with awesome sound quality that you can never move on from. Enjoy
                perfect flexibility and mobility with amazing musical quality
                with these {product.category || "audio products"} giving you a
                truly awesome audio experience. It blends with exceptional sound
                quality and a range of smart features for an unrivalled listening
                experience.
              </p>
            </div>
          )}

          {/* 3. Reviews Tab */}
          {activeTab === "Reviews" && (
            <div className="w-full space-y-6 py-2">
              {reviewsData.map((rev) => (
                <div key={rev.id} className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
                    <FiUser size={18} />
                  </div>

                  {/* Review Information */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">
                      {rev.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-2 text-xs text-[#a8b1c5]">
                      <div
                        className="flex items-center gap-0.5 text-[#e10600]"
                        aria-label={`${rev.rateCount} out of 5 stars`}
                      >
                        {Array.from({ length: rev.rateCount || 5 }).map(
                          (_, idx) => (
                            <span key={idx}>★</span>
                          )
                        )}
                      </div>
                      <span className="text-[#444]">|</span>
                      <span>{rev.date}</span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-[#a8b1c5]">
                      {rev.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Advantages and Footer */}
      <Advantages />
      <Footer />
    </div>
  );
}

export default ProductDetails;
