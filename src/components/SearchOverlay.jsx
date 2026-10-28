import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { closeSearch } from "../redux/searchSlice";
import productsData from "../data/productsData";

function SearchModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const suggestionsListRef = useRef(null);

  const trimmedQuery = query.trim().toLowerCase();
  const matchingProducts = trimmedQuery
    ? productsData.filter((product) =>
        product?.title?.toLowerCase().includes(trimmedQuery)
      )
    : [];

  // Focus input and lock body scroll on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Global Escape key listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeSearch());
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [dispatch]);

  // Scroll active item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsListRef.current) {
      const activeElement = suggestionsListRef.current.children[selectedIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleBackdropClick = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      dispatch(closeSearch());
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSelectProduct = (product) => {
    dispatch(closeSearch());
    // Navigate using existing React Router route
    navigate("/");
    if (product?.id && typeof document !== "undefined") {
      const el = document.getElementById(`product-${product.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      dispatch(closeSearch());
    } else if (e.key === "ArrowDown") {
      if (matchingProducts.length === 0) return;
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < matchingProducts.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      if (matchingProducts.length === 0) return;
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : matchingProducts.length - 1
      );
    } else if (e.key === "Enter") {
      if (matchingProducts.length > 0) {
        e.preventDefault();
        const chosen =
          selectedIndex >= 0
            ? matchingProducts[selectedIndex]
            : matchingProducts[0];
        if (chosen) {
          handleSelectProduct(chosen);
        }
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product Search"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex flex-col items-center pt-16 sm:pt-20 px-4 bg-black/80"
    >
      <div
        ref={panelRef}
        style={{ width: "min(730px, calc(100vw - 32px))" }}
        className="relative max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for product..."
            role="combobox"
            aria-expanded={matchingProducts.length > 0}
            aria-autocomplete="list"
            aria-controls="search-suggestions-list"
            aria-activedescendant={
              selectedIndex >= 0
                ? `search-suggestion-${selectedIndex}`
                : undefined
            }
            className="w-full bg-[#121212] border border-[#3a3a3a] px-4 py-2.5 pr-10 text-sm sm:text-base text-white placeholder-[#7f8594] focus:outline-none"
          />

          {query.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <IoClose size={18} />
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {query.trim().length > 0 && (
          <ul
            id="search-suggestions-list"
            role="listbox"
            ref={suggestionsListRef}
            onMouseLeave={() => setSelectedIndex(-1)}
            className="w-full bg-[#121212] border border-t-0 border-[#3a3a3a] max-h-[380px] overflow-y-auto"
          >
            {matchingProducts.length > 0 ? (
              matchingProducts.map((product, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <li
                    key={product.id || index}
                    id={`search-suggestion-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectProduct(product)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseLeave={() => setSelectedIndex(-1)}
                    className={`px-4 py-2.5 sm:py-3 text-sm sm:text-base cursor-pointer transition-colors duration-200 ease-in-out ${
                      isSelected
                        ? "text-[#e10600]"
                        : "text-[#a8b1c5] hover:text-[#e10600]"
                    }`}
                  >
                    {product.title}
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-4 text-center text-sm text-[#7f8594]">
                No products found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

function SearchOverlay() {
  const isOpen = useSelector((state) => state.search.isOpen);

  if (!isOpen) return null;

  return <SearchModal />;
}

export default SearchOverlay;
