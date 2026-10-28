import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./components/Cart";
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
