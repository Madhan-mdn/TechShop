import { useNavigate } from "react-router-dom";
import { BsCartX } from "react-icons/bs";

function Cart() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Large Red Shopping Cart Icon with X */}
      <div className="mb-6 flex items-center justify-center text-[#e10600]">
        <BsCartX size={100} aria-hidden="true" />
      </div>

      {/* Heading */}
      <h2 className="mb-6 text-xl font-bold tracking-tight text-white sm:text-2xl">
        Your Cart is Empty
      </h2>

      {/* Start Shopping Button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="cursor-pointer rounded-sm bg-[#e10600] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 active:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        Start Shopping
      </button>
    </section>
  );
}

export default Cart;
