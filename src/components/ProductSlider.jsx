import { Link } from "react-router-dom";
import SlickModule from "react-slick";

const Slider = SlickModule.default ?? SlickModule;

import productsData from "../data/productsData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductSlider() {
  const slides = productsData.slice(0, 3);

  const settings = {
    dots: true,
    arrows: false,
    infinite: slides.length > 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  if (!slides.length) {
    return null;
  }

  return (
    <section className="product-slider relative w-full overflow-hidden bg-[#141414]">
      <Slider {...settings}>
        {slides.map((item) => (
          <div key={item.id ?? item.title}>
            <div className="relative flex h-[480px] sm:h-[520px] lg:h-[580px] w-full items-center overflow-hidden bg-[#141414] px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 text-[#a8b1c5]">

              {/* Large Background Product Type */}
              <span className="absolute left-6 top-6 sm:left-12 sm:top-10 lg:left-20 lg:top-12 z-0 select-none whitespace-nowrap text-[70px] sm:text-[110px] md:text-[140px] lg:text-[180px] font-black uppercase leading-none text-white/[0.035] pointer-events-none">
                {item.type}
              </span>

              {/* Product Information */}
              <div className="relative z-10 w-[58%] sm:w-[54%] md:w-1/2 max-w-[560px]">
                <Link
                  to={`/products/${item.id}`}
                  className="mb-2 sm:mb-3 block text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#a8b1c5] hover:text-white transition-colors cursor-pointer"
                >
                  {item.title}
                </Link>

                <Link to={`/products/${item.id}`}>
                  <h2 className="mb-4 sm:mb-6 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white hover:text-[#e10600] transition-colors cursor-pointer">
                    {item.tagline}
                  </h2>
                </Link>

                <div className="mb-6 sm:mb-8 flex items-baseline gap-3 sm:gap-4">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    ₹{item.finalPrice}
                  </span>

                  <span className="text-sm sm:text-base lg:text-lg font-medium text-[#777] line-through">
                    ₹{item.originalPrice}
                  </span>
                </div>

                <Link
                  to={`/products/${item.id}`}
                  className="inline-flex items-center justify-center bg-[#e10600] px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-white transition-colors duration-200 hover:bg-[#c00500] cursor-pointer"
                >
                  Shop Now
                </Link>
              </div>

              {/* Product Image */}
              <Link
                to={`/products/${item.id}`}
                className="absolute right-4 sm:right-10 md:right-16 lg:right-20 xl:right-28 top-1/2 flex h-[72%] sm:h-[80%] lg:h-[86%] w-[42%] sm:w-[45%] lg:w-[46%] -translate-y-1/2 items-center justify-center z-10 cursor-pointer"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] select-none transition-transform duration-300 hover:scale-105"
                />
              </Link>

            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default ProductSlider;
