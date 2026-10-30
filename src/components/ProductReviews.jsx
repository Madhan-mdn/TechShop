import { FiUser } from "react-icons/fi";
import reviewsData from "../data/reviewsData";

function ProductReviews() {
  if (!reviewsData || reviewsData.length === 0) {
    return (
      <p className="text-sm text-[#a8b1c5]">
        No reviews available at the moment.
      </p>
    );
  }

  return (
    <div className="w-full space-y-6 py-2">
      {reviewsData.map((rev) => (
        <div key={rev.id} className="flex items-start gap-4">
          {/* User Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
            <FiUser size={18} />
          </div>

          {/* Review Information */}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white">{rev.name}</h4>

            <div className="mt-1 flex items-center gap-2 text-xs text-[#a8b1c5]">
              <div
                className="flex items-center gap-0.5 text-[#e10600]"
                aria-label={`${rev.rateCount} out of 5 stars`}
              >
                {Array.from({ length: rev.rateCount || 5 }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <span className="text-[#444]">|</span>
              <span>{rev.date}</span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-[#a8b1c5]">
              {rev.review}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductReviews;
