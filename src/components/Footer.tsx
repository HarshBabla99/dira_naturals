import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-lg">Dira Naturals</h3>
          <p className="mt-2 text-sm text-muted-foreground">Luxury handmade soaps crafted with all‑natural ingredients.</p>
        </div>
        <nav className="text-sm space-y-2">
          <a href="#about" className="story-link block">About</a>
          <a href="#featured" className="story-link block">Featured</a>
          <a href="#testimonials" className="story-link block">Testimonials</a>
          <Link to="/shop" className="story-link block">Shop</Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          <p>Contact: hello@diranaturals.com</p>
          <p className="mt-2">© {new Date().getFullYear()} Dira Naturals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
