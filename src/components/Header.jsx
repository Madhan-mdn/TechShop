import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSearch } from "../redux/searchSlice";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const uniqueCount = cartItems.length;

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

        <button
          type="button"
          title="Profile"
          className="transition-colors hover:text-white cursor-pointer"
        >
          <FiUser size={21} />
        </button>
      </div>
    </header>
  );
}

export default Header;
