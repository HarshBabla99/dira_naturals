import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingBag, Store, Languages, Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

const BrandHeader = () => {
  const { openCart, items } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#about", label: t("ourStory") },
    { href: "/#featured", label: t("featured") },
    { href: "/#testimonials", label: t("testimonials") },
    { href: "/shop", label: t("shop"), isRoute: true },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-serif text-xl tracking-wide">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="hidden xs:inline">Dira Naturals</span>
          <span className="xs:hidden">Dira</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link key={link.href} to={link.href} className="story-link text-base font-medium">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className="story-link text-base font-medium">
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-sm"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span className={language === "en" ? "text-foreground font-medium" : "text-muted-foreground"}>EN</span>
            <span className="text-muted-foreground">/</span>
            <span className={language === "sw" ? "text-foreground font-medium" : "text-muted-foreground"}>SW</span>
          </button>

          {/* Shop Button - Desktop Only */}
          <Link to="/shop" className="btn-ghost hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Store className="h-4 w-4" /> {t("shop")}
          </Link>

          {/* Cart Button */}
          <button aria-label="Open cart" onClick={openCart} className="btn h-10 w-10 sm:w-auto sm:px-4 p-0 sm:py-2 text-sm flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{t("cart")}</span>
            {count > 0 && (
              <span className="ml-1 sm:ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs text-accent-foreground font-medium">
                {count}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-ghost p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-background animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className="text-base font-medium py-2 border-b border-border/50"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-base font-medium py-2 border-b border-border/50"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default BrandHeader;
