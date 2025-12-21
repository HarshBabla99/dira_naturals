import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const BrandHeader = () => {
  const { openCart, items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-wide">Dira Naturals</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#about" className="story-link">About</a>
          <a href="#featured" className="story-link">Featured</a>
          <a href="#testimonials" className="story-link">Testimonials</a>
          <Link className="story-link" to="/shop">Shop</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/shop" className="btn-ghost hidden sm:inline-flex">Shop</Link>
          <button aria-label="Open cart" onClick={openCart} className="btn relative">
            <ShoppingBag className="mr-2 h-4 w-4" /> Cart
            {count > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-2 text-xs text-accent-foreground">{count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default BrandHeader;
