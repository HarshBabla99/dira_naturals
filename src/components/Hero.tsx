import heroImage from "@/assets/hero-soaps.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section aria-label="Hero" className="relative">
      <div className="relative h-[70vh] md:h-[78vh] overflow-hidden rounded-2xl border">
        <img
          src={heroImage}
          alt="Luxurious artisanal handmade soap bars on natural stone"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-6 pb-12 md:pb-16 animate-fade-in">
            <h1 className="heading-xl max-w-3xl">Luxury in Every Lather – Handmade with All‑Natural Ingredients</h1>
            <p className="body-lg mt-4 max-w-2xl">Refined, minimal, and meticulously crafted soaps that elevate your daily ritual.</p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/shop" className="btn">Shop Now</Link>
              <a href="#about" className="btn-ghost">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
