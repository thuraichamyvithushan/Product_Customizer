import Hero from "../components/Home/Hero";
import CategoryShowcase from "../components/Home/CategoryShowcase";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Testimonials from "../components/Home/Testimonials";
import PetFAQ from "../components/Home/PetFAQ";

const Home = () => {
  return (
    <>
    <Hero/>
    <CategoryShowcase />
      <FeaturedProducts />
      <Testimonials />
      <PetFAQ/>
    </>
  );
};

export default Home;


