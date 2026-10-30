
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SlickModule from "react-slick";
import productsData from "../data/productsData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = SlickModule.default ?? SlickModule;

function FeaturedProducts() {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const products = productsData.filter(
    (product) => product.tag === "featured-product"
  );

  // When slideCount <= slidesToShow (5 <= 5), React Slick automatically sets unslick = true,
  // disabling transitions, autoplay, and cloning into a static row.
  // Duplicating the 5 products ensures slideCount > slidesToShow so genuine infinite horizontal
  // carousel movement, continuous looping, and center-mode calculations function as intended.
  const slides =
    products.length > 0 && products.length <= 5
      ? [...products, ...products, ...products]
      : products;

  const activeDot =
    products.length > 0
      ? ((activeSlide % products.length) + products.length) % products.length
      : 0;

  const handleDotClick = (targetIndex) => {
    if (!sliderRef.current || products.length === 0) return;
    if (targetIndex === activeDot) return;

    let diff = targetIndex - activeDot;
    if (diff > products.length / 2) diff -= products.length;
    if (diff < -products.length / 2) diff += products.length;

    if (diff === 1) {
      sliderRef.current.slickNext();
    } else if (diff === -1) {
      sliderRef.current.slickPrev();
    } else {
      let target = activeSlide + diff;
      if (target < 0) target += slides.length;
      if (target >= slides.length) target -= slides.length;
      sliderRef.current.slickGoTo(target);
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (_current, next) => {
      setActiveSlide(next);
    },
    appendDots: () => (
      <ul className="slick-dots">
        {products.map((product, index) => (
          <li
            key={product.id}
            className={activeDot === index ? "slick-active" : ""}
          >
            <button
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1} - ${product.title}`}
            />
          </li>
        ))}
      </ul>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  if (!products.length) return null;

  return (
    <section className="featured-products mx-auto w-full max-w-[1400px] overflow-hidden px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="mb-12 text-center text-2xl font-bold text-[#a8b1c5] sm:mb-16 sm:text-3xl">
        Featured Products
      </h2>

      <Slider ref={sliderRef} {...settings}>
        {slides.map((product, idx) => {
          const image = product.images?.[0] || product.heroImage;
          const price = product.finalPrice ?? product.price;
          const originalPrice =
            product.originalPrice ?? product.priceBeforeDiscount;

          return (
            <div key={`${product.id}-${idx}`}>
              <article className="featured-card flex h-[300px] flex-col items-center justify-center px-2 text-center sm:h-[340px]">
                <Link
                  to={`/products/${product.id}`}
                  className="mb-4 min-h-8 text-xs font-medium text-[#a8b1c5] hover:text-white transition-colors cursor-pointer sm:text-sm line-clamp-2 block"
                >
                  {product.title}
                </Link>

                <Link
                  to={`/products/${product.id}`}
                  className="featured-image mb-5 flex h-28 w-full items-center justify-center cursor-pointer sm:h-36"
                >
                  {image && (
                    <img
                      src={image}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  )}
                </Link>

                <div className="featured-details">
                  <p className="text-sm font-bold text-[#a8b1c5] sm:text-base">
                    {price != null
                      ? `₹${Number(price).toLocaleString("en-IN")}`
                      : ""}
                  </p>

                  {originalPrice != null && (
                    <p className="mt-1 text-xs text-gray-500 line-through">
                      ₹{Number(originalPrice).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </article>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}

export default FeaturedProducts;
