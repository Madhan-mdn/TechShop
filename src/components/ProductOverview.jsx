function ProductOverview({ product }) {
  if (!product) return null;

  const productTitle = product.title || "Product";
  const productInfo = product.info || "";
  const productCategory = product.category || "audio products";

  return (
    <div className="w-full space-y-6 text-xs sm:text-sm text-[#a8b1c5] leading-relaxed">
      <h3 className="text-sm sm:text-base font-medium text-white">
        The{" "}
        <span className="text-[#e10600] font-bold">
          {productTitle}
        </span>{" "}
        {productInfo} provides with fabulous sound quality
      </h3>

      <ul className="space-y-2 text-[#a8b1c5]">
        <li>• Sound Tuned to Perfection</li>
        <li>• Comfortable to Wear</li>
        <li>• Long Hours Playback Time</li>
      </ul>

      <p>
        Buy the{" "}
        <span className="text-white font-semibold">
          {productTitle} {productInfo}
        </span>{" "}
        which offers you with fabulous music experience by providing you with
        awesome sound quality that you can never move on from. Enjoy perfect
        flexibility and mobility with amazing musical quality with these{" "}
        {productCategory} giving you a truly awesome audio experience. It blends
        with exceptional sound quality and a range of smart features for an
        unrivalled listening experience.
      </p>
    </div>
  );
}

export default ProductOverview;
