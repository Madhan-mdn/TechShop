import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsCartX } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // A. Empty Cart State
  if (!items || items.length === 0) {
    return (
      <section className="flex min-h-[calc(100vh-220px)] flex-col items-center justify-center px-4 py-16 text-center">
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

  // B. Populated Cart Calculations
  const uniqueCount = items.length;

  const totalOriginalPrice = items.reduce((sum, item) => {
    const orig = Number(item.originalPrice) || Number(item.finalPrice) || 0;
    return sum + orig * item.quantity;
  }, 0);

  const totalPrice = items.reduce((sum, item) => {
    const finalP = Number(item.finalPrice) || 0;
    return sum + finalP * item.quantity;
  }, 0);

  const discount = Math.max(0, totalOriginalPrice - totalPrice);

  return (
    <section className="mx-auto w-full max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.8fr_1fr] lg:gap-12 xl:grid-cols-[2fr_1fr]">
        
        {/* Left Side: Cart Items Panel - Normal Vertical List (Naturally Expanding) */}
        <div className="rounded-md border border-[#222222] bg-[#141414] p-4 sm:p-6 md:p-8">
          {items.map((item, index) => {
            const image =
              item.image || item.images?.[0] || item.heroImage || "";
            const fullTitle = `${item.title} ${item.info || ""}`.trim();
            const finalPrice = Number(item.finalPrice) || 0;
            const originalPrice =
              item.originalPrice != null
                ? Number(item.originalPrice)
                : finalPrice;

            return (
              <div key={item.id}>
                {/* Horizontal divider between consecutive items with horizontal inset */}
                {index > 0 && (
                  <hr className="my-2 border-t border-[#222222] mx-2 sm:mx-4" />
                )}

                <div className="flex items-center gap-5 sm:gap-8 lg:gap-10 py-6 sm:py-8 first:pt-1 last:pb-1">
                  {/* Product Image: Clean presentation with NO border, card background, outline, or shadow */}
                  <Link
                    to={`/products/${item.id}`}
                    className="flex h-24 w-24 shrink-0 items-center justify-center bg-transparent sm:h-32 sm:w-32 lg:h-36 lg:w-36 cursor-pointer"
                  >
                    {image && (
                      <img
                        src={image}
                        alt={item.title}
                        className="h-full w-full object-contain select-none transition-transform duration-300 hover:scale-105"
                      />
                    )}
                  </Link>

                  {/* Product Details & Controls */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    {/* Title & Delete Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to={`/products/${item.id}`}
                        className="hover:text-white transition-colors flex-1"
                      >
                        <h3 className="text-sm font-medium leading-snug text-neutral-200 line-clamp-2 sm:text-base cursor-pointer">
                          {fullTitle}
                        </h3>
                      </Link>

                      <button
                        type="button"
                        title="Remove item"
                        aria-label={`Remove ${item.title} from cart`}
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="cursor-pointer p-1 text-neutral-400 transition-colors hover:text-red-500 shrink-0"
                      >
                        <TbTrash size={20} />
                      </button>
                    </div>

                    {/* Price Row */}
                    <div className="mt-3 flex items-baseline gap-3">
                      <span className="text-lg font-bold text-white sm:text-xl md:text-2xl tracking-tight">
                        ₹{finalPrice.toLocaleString("en-IN")}
                      </span>

                      {originalPrice > finalPrice && (
                        <span className="text-xs font-normal text-neutral-500 line-through sm:text-sm">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center">
                      <div className="inline-flex items-center rounded-sm border border-[#2a2a2a] bg-[#1a1a1a]">
                        <button
                          type="button"
                          title="Decrease quantity"
                          aria-label="Decrease quantity"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="flex h-7 w-8 sm:h-8 sm:w-9 items-center justify-center text-sm font-semibold text-neutral-400 transition-colors hover:text-white cursor-pointer"
                        >
                          −
                        </button>
                        <span className="flex h-7 min-w-[32px] sm:h-8 sm:min-w-[36px] items-center justify-center px-1 text-xs sm:text-sm font-bold text-[#e10600]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          title="Increase quantity"
                          aria-label="Increase quantity"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="flex h-7 w-8 sm:h-8 sm:w-9 items-center justify-center text-sm font-semibold text-neutral-400 transition-colors hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Order Summary Panel (Sticky on Desktop) */}
        <div className="self-start rounded-md border border-[#222222] bg-[#141414] p-6 lg:sticky lg:top-24">
          <h2 className="mb-6 text-lg font-bold text-white sm:text-xl">
            Order Summary ( {uniqueCount} {uniqueCount === 1 ? "item" : "items"} )
          </h2>

          <div className="space-y-4 text-sm">
            {/* Original Price */}
            <div className="flex items-center justify-between text-neutral-400">
              <span>Original Price</span>
              <span className="font-medium text-white">
                ₹{totalOriginalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between text-neutral-400">
              <span>Discount</span>
              <span className="font-medium text-green-500">
                {discount > 0 ? `- ₹${discount.toLocaleString("en-IN")}` : "₹0"}
              </span>
            </div>

            {/* Delivery */}
            <div className="flex items-center justify-between text-neutral-400">
              <span>Delivery</span>
              <span className="font-medium text-green-500">Free</span>
            </div>

            {/* Divider */}
            <hr className="my-5 border-t border-[#222222]" />

            {/* Total Price */}
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-base font-bold text-white sm:text-lg">
                Total Price
              </span>
              <span className="text-xl font-bold text-white sm:text-2xl">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            type="button"
            onClick={() => {
              alert("Checkout functionality is ready!");
            }}
            className="mt-6 w-full cursor-pointer rounded-sm bg-[#e10600] py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 active:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            Checkout
          </button>
        </div>

      </div>
    </section>
  );
}

export default Cart;
