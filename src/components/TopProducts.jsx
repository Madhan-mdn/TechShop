import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import ProductCard from "./ProductCard";

const categories = [
  "All",
  "Headphones",
  "Earbuds",
  "Earphones",
  "Neckbands",
];

function getCategory(product) {
  const category = (
    product.category ||
    product.categoryName ||
    product.type ||
    ""
  ).toLowerCase();

  const title = (product.title || "").toLowerCase();

  // Prefer the category already stored in the product data.
  if (category.includes("headphone")) return "Headphones";
  if (category.includes("earbud") || category.includes("airpod"))
    return "Earbuds";
  if (category.includes("neckband")) return "Neckbands";
  if (category.includes("earphone") || category.includes("wired"))
    return "Earphones";

  // Fallback when the data has no category field.
  if (
    title.includes("neckband") ||
    title.includes("rockerz 255") ||
    title.includes("rockerz 330")
  ) {
    return "Neckbands";
  }

  if (
    title.includes("airpods") ||
    title.includes("airdopes") ||
    title.includes("earbuds") ||
    title.includes("buds")
  ) {
    return "Earbuds";
  }

  if (
    title.includes("earphone") ||
    title.includes("endurance run") ||
    title.includes("wired")
  ) {
    return "Earphones";
  }

  if (
    title.includes("headphone") ||
    title.includes("tune") ||
    title.includes("rockerz") ||
    title.includes("wh-") ||
    title.includes("live ")
  ) {
    return "Headphones";
  }

  return "Other";
}

function TopProducts() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? productsData.slice(0, 11)
      : productsData.filter(
          (product) => getCategory(product) === activeCategory
        );

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16">
      {/* Heading */}
      <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-white sm:text-2xl">
        Top Products
      </h2>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-4 md:gap-6">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 sm:px-4 sm:text-sm ${
              activeCategory === category
                ? "bg-[#e10600] text-white"
                : "bg-transparent text-neutral-400 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Browse All Products tile */}
        <button
          type="button"
          className="group flex h-full min-h-[340px] cursor-pointer flex-col items-center justify-center border border-[#262626] bg-[#121212] p-6 text-center transition-colors duration-200 hover:border-[#383838] hover:bg-[#161616] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          onClick={() => navigate("/products")}
        >
          <span className="text-base font-medium text-neutral-300 transition-colors duration-200 group-hover:text-white sm:text-lg">
            Browse All
            <br />
            Products &rarr;
          </span>
        </button>
      </div>
    </section>
  );
}

export default TopProducts;
