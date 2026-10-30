import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchOverlay from "./components/SearchOverlay";
import AuthModal from "./components/AuthModal";

function App() {
  return (
    <BrowserRouter>
      <SearchOverlay />
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white">
              <Header />
              <main className="flex flex-1 items-center justify-center">
                <Cart />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
