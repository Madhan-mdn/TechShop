
import SlickModule from "react-slick";

const Slider = SlickModule.default ?? SlickModule;

import productsData from "../data/productsData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

console.log("Slider:", Slider);
console.log("Slider type:", typeof Slider);
console.log("Products data:", productsData);

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
    <section className="mx-auto w-full px-4 bg">
      <Slider {...settings}>
        {slides.map((item) => (
          <div key={item.id ?? item.title}>
            <div className="relative flex h-[540px] items-center overflow-hidden bg-[#141414] px-10 text-[#a8b1c5]">

              {/* Large Background Product Type */}
              <span className=" absolute left-2 top-22 z-0 select-none whitespace-nowrap text-[170px] font-extrabold leading-none text-white/[0.025]">
                {item.type}
              </span>

              {/* Product Information */}
              <div className="relative ml-17 z-10 w-1/2">
                <p className="mb-3 text-lg font-medium">
                  {item.title}
                </p>

                <h2 className="mb-8 max-w-[500px] text-[46px] font-bold leading-[1.2] text-white">
                  {item.tagline}
                </h2>

                <div className="mb-10 flex items-center gap-4">
                  <span className="text-2xl font-bold text-white">
                    ₹{item.finalPrice}
                  </span>

                  <span className="text-lg font-semibold text-[#777] line-through">
                    ₹{item.originalPrice}
                  </span>
                </div>

                <button
                  type="button"
                  className="bg-[#e10600] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-700"
                >
                  Shop Now
                </button>
              </div>

              {/* Product Image */}
              <div className="absolute right-5 top-1/2 flex h-[85%] w-[48%] -translate-y-1/2 items-center justify-center">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-contain"
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
