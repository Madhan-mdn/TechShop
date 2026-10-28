import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Advantages from "../components/Advantages";
import ProductCard from "../components/ProductCard";
import productsData from "../data/productsData";
import { sortMenu, brandsMenu, categoryMenu } from "../data/filterBarData";

const DEFAULT_PRICE = 20000;

function Products() {
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(DEFAULT_PRICE);

  // Check if any filter or non-default sorting is active
  const hasActiveFilters =
    selectedSort !== null ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    price < DEFAULT_PRICE;

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
    setPrice(DEFAULT_PRICE);
  };

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
                className="w-full bg-[#e10600] hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-semibold py-2 px-4 transition-colors cursor-pointer mb-6"
              >
                Clear Filters
              </button>
            )}

            {/* Sort By Section */}
            <div className={hasActiveFilters ? "" : "mt-0"}>
              <h3 className="text-sm font-bold text-white border-b border-[#262626] pb-2">
                Sort By
              </h3>
              <ul className="mt-3 space-y-2">
                {sortMenu.map((item) => {
                  const isSelected = selectedSort === item.title;
                  return (
                    <li
                      key={item.id}
                      onClick={() => handleSortSelect(item.title)}
                      className={`text-xs sm:text-sm transition-colors cursor-pointer py-0.5 ${
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
                  {brandsMenu.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#a8b1c5] hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.label)}
                        onChange={() => handleBrandToggle(brand.label)}
                        className="h-3.5 w-3.5 rounded-none border border-[#444] bg-[#1a1a1a] accent-[#e10600] cursor-pointer"
                      />
                      <span
                        className={
                          selectedBrands.includes(brand.label)
                            ? "text-white"
                            : ""
                        }
                      >
                        {brand.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mt-5">
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-2.5">
                  Category
                </h4>
                <div className="space-y-2">
                  {categoryMenu.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#a8b1c5] hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.label)}
                        onChange={() => handleCategoryToggle(cat.label)}
                        className="h-3.5 w-3.5 rounded-none border border-[#444] bg-[#1a1a1a] accent-[#e10600] cursor-pointer"
                      />
                      <span
                        className={
                          selectedCategories.includes(cat.label)
                            ? "text-white"
                            : ""
                        }
                      >
                        {cat.label}
                      </span>
                    </label>
                  ))}
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
                  min="400"
                  max="20000"
                  step="100"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-[#e10600] cursor-pointer"
                />
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <section className="flex-1 w-full min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {productsData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
