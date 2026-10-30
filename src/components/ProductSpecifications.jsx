function ProductSpecifications({ product }) {
  if (!product) return null;

  const hasSpecifications = Boolean(
    product.brand ||
    product.title ||
    product.category ||
    product.type ||
    product.connectivity
  );

  if (!hasSpecifications) {
    return (
      <p className="text-sm text-[#a8b1c5]">
        No specifications available for this product.
      </p>
    );
  }

  const specRows = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.title },
    { label: "Generic Name", value: product.category },
    { label: "Headphone Type", value: product.type },
    { label: "Connectivity", value: product.connectivity },
    { label: "Microphone", value: "Yes" },
  ];

  return (
    <div className="w-full space-y-5 text-xs sm:text-sm">
      {specRows.map(
        (row, idx) =>
          row.value && (
            <div
              key={idx}
              className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] py-1"
            >
              <span className="text-[#a8b1c5]">{row.label}</span>
              <span className="text-white font-medium">{row.value}</span>
            </div>
          )
      )}
    </div>
  );
}

export default ProductSpecifications;
