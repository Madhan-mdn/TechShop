import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSearch } from "../redux/searchSlice";
import { openAuthModal } from "../redux/authSlice";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const uniqueCount = cartItems.length;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!isProfileOpen) return;

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  const handleOpenLogin = () => {
    setIsProfileOpen(false);
    dispatch(openAuthModal("login"));
  };

  return (
    <header className="w-full flex justify-between px-16 py-2 bg-[#0f0f0f] text-[#a8b1c5] sticky top-0 z-30">
      <Link
        to="/"
        className="text-2xl font-bold tracking-tight transition-colors hover:text-white"
      >
        Tech-Shop
      </Link>

      <div className="flex items-center gap-9">
        <button
          type="button"
          title="Search"
          onClick={() => dispatch(openSearch())}
          aria-label="Open search"
          className="transition-colors hover:text-white cursor-pointer"
        >
          <FiSearch size={21} />
        </button>

        <Link
          to="/cart"
          title="Shopping Cart"
          className="relative transition-colors hover:text-white cursor-pointer flex items-center justify-center"
        >
          <FiShoppingCart size={21} />
          {uniqueCount > 0 && (
            <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#e10600] text-[10px] font-bold text-white">
              {uniqueCount}
            </span>
          )}
        </Link>

        {/* Profile menu container */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            title="Profile"
            aria-label="Profile"
            aria-expanded={isProfileOpen}
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="transition-colors hover:text-white cursor-pointer flex items-center justify-center"
          >
            <FiUser size={21} />
          </button>

          {/* Profile Dropdown Popup */}
          {isProfileOpen && (
            <div
              className="absolute right-0 top-full mt-3 w-72 border border-[#333333] bg-[#141414] p-5 shadow-2xl z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-base font-bold text-white leading-snug">
                Hello!
              </h3>
              <p className="mt-1 text-xs text-[#a8b1c5]">
                Access account and manage orders
              </p>

              <button
                type="button"
                onClick={handleOpenLogin}
                className="mt-4 border border-[#444444] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:border-white hover:text-white cursor-pointer inline-block"
              >
                Login / Signup
              </button>

              <hr className="my-4 border-t border-[#262626]" />

              <button
                type="button"
                onClick={handleOpenLogin}
                className="text-xs text-[#a8b1c5] transition-colors duration-200 hover:text-white cursor-pointer block text-left"
              >
                Please Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
