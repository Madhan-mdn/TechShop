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
    <section className="product-slider mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
      <Slider {...settings}>
        {slides.map((item) => (
          <div key={item.id ?? item.title}>
            <div className="relative flex h-[480px] sm:h-[520px] lg:h-[560px] items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#181818] via-[#141414] to-[#101010] border border-white/[0.06] px-6 sm:px-10 md:px-14 lg:px-16 text-[#a8b1c5] shadow-2xl">

              {/* Large Background Product Type */}
              <span className="absolute left-4 top-8 sm:left-8 sm:top-12 lg:left-12 lg:top-14 z-0 select-none whitespace-nowrap text-[80px] sm:text-[120px] md:text-[150px] lg:text-[190px] font-black uppercase leading-none text-white/[0.025] pointer-events-none">
                {item.type}
              </span>

              {/* Product Information */}
              <div className="relative z-10 w-[55%] sm:w-[52%] md:w-1/2 max-w-[560px]">
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#a8b1c5]">
                  {item.title}
                </p>

                <h2 className="mb-4 sm:mb-6 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white">
                  {item.tagline}
                </h2>

                <div className="mb-6 sm:mb-8 flex items-baseline gap-3 sm:gap-4">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    ₹{item.finalPrice}
                  </span>

                  <span className="text-sm sm:text-base lg:text-lg font-medium text-[#777] line-through">
                    ₹{item.originalPrice}
                  </span>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-[#e10600] px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-white rounded-md shadow-lg shadow-red-950/40 transition-all duration-300 hover:bg-[#c00500] hover:shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Shop Now
                </button>
              </div>

              {/* Product Image */}
              <div className="absolute right-2 sm:right-6 lg:right-12 top-1/2 flex h-[70%] sm:h-[80%] lg:h-[85%] w-[42%] sm:w-[45%] lg:w-[46%] -translate-y-1/2 items-center justify-center pointer-events-none z-10">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out hover:scale-105 select-none"
                />
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default ProductSlider;
