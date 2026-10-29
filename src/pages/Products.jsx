import { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Advantages from "../components/Advantages";
import ProductCard from "../components/ProductCard";
import productsData from "../data/productsData";
import { sortMenu, brandsMenu, categoryMenu } from "../data/filterBarData";

// Dynamically compute the maximum price from the dataset
const MAX_PRICE = Math.max(
  ...productsData.map((p) => Number(p.finalPrice ?? p.price ?? 0)),
  0
);

/**
 * Normalizes category names for consistent case-insensitive comparison
 */
function normalizeString(str) {
  return (str || "").toLowerCase().replace(/\s+/g, "").trim();
}

/**
 * Retrieves or derives a product's category
 */
function getProductCategory(product) {
  if (product.category) return product.category;
  const text = `${product.title || ""} ${product.info || ""} ${product.type || ""}`.toLowerCase();
  if (text.includes("headphone")) return "Headphones";
  if (text.includes("earbud") || text.includes("airpod") || text.includes("airdopes"))
    return "Earbuds";
  if (text.includes("neckband")) return "Neckbands";
  if (text.includes("earphone") || text.includes("wired") || text.includes("basshead"))
    return "Earphones";
  return "";
}

function Products() {
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(MAX_PRICE);

  // Clear Filters visibility condition derived directly from active filters
  const hasActiveFilters =
    selectedSort !== null ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    price < MAX_PRICE;

  const handleBrandToggle = (brandLabel) => {
    setSelectedBrands((prev) =>
      prev.includes(brandLabel)
        ? prev.filter((b) => b !== brandLabel)
        : [...prev, brandLabel]
    );
  };

  const handleCategoryToggle = (categoryLabel) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel)
        ? prev.filter((c) => c !== categoryLabel)
        : [...prev, categoryLabel]
    );
  };

  const handleSortSelect = (sortTitle) => {
    setSelectedSort((prev) => (prev === sortTitle ? null : sortTitle));
  };

  const handleClearFilters = () => {
    setSelectedSort(null);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPrice(MAX_PRICE);
  };

  // Derive filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filter products across groups with AND logic; within groups with OR logic
    const filtered = productsData.filter((product) => {
      // Brand filter (case-insensitive, OR logic)
      if (selectedBrands.length > 0) {
        const prodBrand = (
          product.brand ||
          product.title?.split(" ")[0] ||
          ""
        ).toLowerCase().trim();
        const brandMatch = selectedBrands.some(
          (b) => b.toLowerCase().trim() === prodBrand
        );
        if (!brandMatch) return false;
      }

      // Category filter (normalized, OR logic)
      if (selectedCategories.length > 0) {
        const prodCat = normalizeString(getProductCategory(product));
        const catMatch = selectedCategories.some(
          (c) => normalizeString(c) === prodCat
        );
        if (!catMatch) return false;
      }

      // Price range filter
      const sellingPrice = Number(product.finalPrice ?? product.price ?? 0);
      if (sellingPrice > price) {
        return false;
      }

      return true;
    });

    // 2. Sort the filtered products without mutating original data
    const sorted = [...filtered];

    if (!selectedSort) {
      // Default: preserve original dataset order
      return sorted;
    }

    switch (selectedSort) {
      case "Latest":
        // Fallback preserving original dataset order as productsData has no date field
        return sorted;

      case "Featured": {
        const isFeatured = (p) => p.tag === "featured-product";
        return sorted.sort((a, b) => {
          if (isFeatured(a) && !isFeatured(b)) return -1;
          if (!isFeatured(a) && isFeatured(b)) return 1;
          return 0; // Preserves relative order
        });
      }

      case "Top Rated":
        return sorted.sort((a, b) => {
          const rateA = Number(a.rateCount ?? 0);
          const rateB = Number(b.rateCount ?? 0);
          if (rateB !== rateA) return rateB - rateA;
          const reviewsA = Number(a.ratings ?? 0);
          const reviewsB = Number(b.ratings ?? 0);
          return reviewsB - reviewsA;
        });

      case "Price(Lowest First)":
      case "Price (Lowest First)":
        return sorted.sort((a, b) => {
          const priceA = Number(a.finalPrice ?? a.price ?? 0);
          const priceB = Number(b.finalPrice ?? b.price ?? 0);
          return priceA - priceB;
        });

      case "Price(Highest First)":
      case "Price (Highest First)":
        return sorted.sort((a, b) => {
          const priceA = Number(a.finalPrice ?? a.price ?? 0);
          const priceB = Number(b.finalPrice ?? b.price ?? 0);
          return priceB - priceA;
        });

      default:
        return sorted;
    }
  }, [selectedBrands, selectedCategories, price, selectedSort]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col justify-between">
      <Header />

      <main className="flex-1 px-4 sm:px-6 md:px-10 lg:px-14 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Sidebar: Filter & Sort Controls */}
          <aside className="w-full md:w-56 lg:w-64 shrink-0 md:sticky md:top-20 max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
            {/* Conditional Clear Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full bg-[#e10600] hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-semibold py-2 px-4 transition-colors duration-200 cursor-pointer mb-6"
              >
                Clear Filters
              </button>
            )}

            {/* Sort By Section */}
            <div className={hasActiveFilters ? "" : "mt-0"}>
              <h3 className="text-sm font-bold text-white border-b border-[#262626] pb-2">
                Sort By
              </h3>
              <ul
                className="mt-3 space-y-2"
                role="radiogroup"
                aria-label="Sort products"
              >
                {sortMenu.map((item) => {
                  const isSelected = selectedSort === item.title;
                  return (
                    <li
                      key={item.id}
                      role="radio"
                      tabIndex={0}
                      aria-checked={isSelected}
                      onClick={() => handleSortSelect(item.title)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSortSelect(item.title);
                        }
                      }}
                      className={`text-xs sm:text-sm transition-colors duration-200 ease-in-out cursor-pointer py-0.5 select-none focus:outline-none focus-visible:text-[#e10600] ${
                        isSelected
                          ? "text-[#e10600] font-semibold"
                          : "text-[#a8b1c5] hover:text-[#e10600]"
                      }`}
                    >
                      {item.title}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Filter By Section */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-white border-b border-[#262626] pb-2">
                Filter By
              </h3>

              {/* Brands */}
              <div className="mt-4">
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-2.5">
                  Brands
                </h4>
                <div className="space-y-2">
                  {brandsMenu.map((brand) => {
                    const isChecked = selectedBrands.includes(brand.label);
                    return (
                      <label
                        key={brand.id}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-[#a8b1c5] hover:text-[#e10600] cursor-pointer select-none transition-colors duration-200 ease-in-out"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleBrandToggle(brand.label)}
                          className="h-3.5 w-3.5 rounded-none border border-[#444] bg-[#1a1a1a] accent-[#e10600] cursor-pointer focus-visible:ring-1 focus-visible:ring-[#e10600]"
                        />
                        <span className={isChecked ? "text-white font-medium" : ""}>
                          {brand.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Category */}
              <div className="mt-5">
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-2.5">
                  Category
                </h4>
                <div className="space-y-2">
                  {categoryMenu.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.label);
                    return (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-[#a8b1c5] hover:text-[#e10600] cursor-pointer select-none transition-colors duration-200 ease-in-out"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(cat.label)}
                          className="h-3.5 w-3.5 rounded-none border border-[#444] bg-[#1a1a1a] accent-[#e10600] cursor-pointer focus-visible:ring-1 focus-visible:ring-[#e10600]"
                        />
                        <span className={isChecked ? "text-white font-medium" : ""}>
                          {cat.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    Price
                  </h4>
                  <span className="text-xs text-[#a8b1c5]">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="10"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-[#e10600] cursor-pointer"
                  aria-label="Filter by maximum price"
                />
              </div>
            </div>
          </aside>

          {/* Right Product Grid or Empty Results */}
          <section className="flex-1 w-full min-w-0">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-[#262626] bg-[#121212] rounded-sm">
                <p className="text-lg font-semibold text-white mb-2">
                  No products found
                </p>
                <p className="text-sm text-[#a8b1c5] max-w-md mb-6">
                  No products match the selected filters. Try adjusting your brand, category, or price range.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="cursor-pointer bg-[#e10600] hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-semibold py-2 px-6 transition-colors rounded-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Advantages and Footer */}
      <Advantages />
      <Footer />
    </div>
  );
}

export default Products;
