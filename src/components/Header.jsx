import {
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

function Header() {
  return (
    <header className="w-full flex justify-between px-16 py-2 text-[#a8b1c5]">
        <h1 className="text-2xl font-bold tracking-tight">
          Tech-Shop
        </h1>

        <div className="flex items-center gap-9">
          <button
            type="button"
            className="transition-colors hover:text-white"
          >
            <FiSearch size={21} />
          </button>

          <button
            type="button"
            className="transition-colors hover:text-white"
          >
            <FiShoppingCart size={21} />
          </button>

          <button
            type="button"
            className="transition-colors hover:text-white"
          >
            <FiUser size={21} />
          </button>
        </div>
    </header>
  );
}

export default Header;
