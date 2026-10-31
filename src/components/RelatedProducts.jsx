import { useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SlickModule from "react-slick";
import ProductCard from "./ProductCard";
import productsData from "../data/productsData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = SlickModule.default ?? SlickModule;

const normalizeCategory = (category) =>
  category ? String(category).trim().toLowerCase() : "";

function PrevArrow({ className, style, onClick }) {
  const isDisabled = className?.includes("slick-disabled");
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Previous slide"
      className={`absolute -left-3 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#141414] text-[#a8b1c5] shadow-lg transition-colors ${
        isDisabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:border-[#e10600] hover:text-white hover:bg-[#e10600] cursor-pointer"
      }`}
      style={{ ...style, display: "flex" }}
    >
      <FiChevronLeft size={20} />
    </button>
  );
}

function NextArrow({ className, style, onClick }) {
  const isDisabled = className?.includes("slick-disabled");
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Next slide"
      className={`absolute -right-3 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#141414] text-[#a8b1c5] shadow-lg transition-colors ${
        isDisabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:border-[#e10600] hover:text-white hover:bg-[#e10600] cursor-pointer"
      }`}
      style={{ ...style, display: "flex" }}
    >
      <FiChevronRight size={20} />
    </button>
  );
}

function RelatedProducts({ currentProduct }) {
  const sliderRef = useRef(null);

  // Reset to first slide when currentProduct changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true);
    }
  }, [currentProduct?.id]);

  if (!currentProduct) return null;

  const currentCategory = normalizeCategory(currentProduct.category);
  if (!currentCategory) {
    return null;
  }

  // Filter products by matching category, strictly excluding the currently viewed product
  const relatedProducts = productsData.filter((product) => {
    if (String(product.id) === String(currentProduct.id)) return false;
    const productCategory = normalizeCategory(product.category);
    return Boolean(productCategory && productCategory === currentCategory);
  });

  if (relatedProducts.length === 0) {
    return null;
  }

  const settings = {
    dots: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    customPaging: (i) => (
      <button
        type="button"
        onClick={() => sliderRef.current?.slickGoTo(i)}
        aria-label={`Go to slide ${i + 1}`}
        className="h-full w-full cursor-pointer"
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, relatedProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, relatedProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="related-products relative w-full pt-16 sm:pt-20 pb-4">
      <h2 className="mb-8 sm:mb-12 text-center text-xl sm:text-2xl font-bold tracking-tight text-white">
        Related Products
      </h2>

      <div className="relative w-full">
        <Slider ref={sliderRef} {...settings}>
          {relatedProducts.map((product) => (
            <div key={product.id} className="h-full px-2 sm:px-2.5">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RelatedProducts;
