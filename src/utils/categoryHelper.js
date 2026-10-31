/**
 * Normalizes and derives product category consistently across the app.
 * Returns one of: "Headphones" | "Earbuds" | "Earphones" | "Neckbands"
 */
export function getProductCategory(product) {
  if (!product) return "";

  // 1. Check explicit category or categoryName field
  const rawCat = (
    product.category ||
    product.categoryName ||
    ""
  ).toLowerCase().trim();

  if (rawCat.includes("headphone")) return "Headphones";
  if (
    rawCat.includes("earbud") ||
    rawCat.includes("airpod") ||
    rawCat.includes("airdopes")
  ) {
    return "Earbuds";
  }
  if (rawCat.includes("neckband")) return "Neckbands";
  if (
    rawCat.includes("earphone") ||
    rawCat.includes("wired") ||
    rawCat.includes("basshead")
  ) {
    return "Earphones";
  }

  // 2. Fall back to title, info, and type fields
  const text = `${product.title || ""} ${product.info || ""} ${
    product.type || ""
  }`.toLowerCase();

  if (
    text.includes("headphone") ||
    text.includes("rockerz 518") ||
    text.includes("rockerz 410") ||
    text.includes("wh-") ||
    text.includes("tune")
  ) {
    return "Headphones";
  }

  if (
    text.includes("earbud") ||
    text.includes("airpod") ||
    text.includes("airdopes") ||
    text.includes("wave") ||
    text.includes("wf-")
  ) {
    return "Earbuds";
  }

  if (
    text.includes("neckband") ||
    text.includes("live 200bt") ||
    text.includes("rockerz 255") ||
    text.includes("wi-xb400")
  ) {
    return "Neckbands";
  }

  if (
    text.includes("earphone") ||
    text.includes("basshead") ||
    text.includes("endurance run") ||
    text.includes("mdr-ex")
  ) {
    return "Earphones";
  }

  return product.category || "";
}
