import BrandHeader from "@/components/BrandHeader";
import Hero from "@/components/Hero";
import SectionAbout from "@/components/SectionAbout";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandHeader />
      <main>
        <Hero />
        <SectionAbout />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
