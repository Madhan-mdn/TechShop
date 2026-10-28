import Header from "../components/Header";
import ProductSlider from "../components/ProductSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import TopProducts from "../components/TopProducts";
import Advantages from "../components/Advantages";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />

      <main>
        <ProductSlider />
        <FeaturedProducts />
        <TopProducts/>
        <Advantages />
      </main>

      <Footer />
    </>
  );
}

export default Home;