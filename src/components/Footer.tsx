import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-6 py-6 md:py-8 grid gap-6 md:grid-cols-3 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center gap-2 font-serif text-xl tracking-wide">
            <Leaf className="h-5 w-5 text-primary" />
            Dira Naturals
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("footerTagline")}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <a href="/#about" className="hover:text-foreground transition-colors">{t("ourStory")}</a>
          <a href="/#featured" className="hover:text-foreground transition-colors">{t("featured")}</a>
          <a href="/#testimonials" className="hover:text-foreground transition-colors">{t("testimonials")}</a>
          <Link to="/shop" className="hover:text-foreground transition-colors">{t("shop")}</Link>
        </nav>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-end text-sm text-muted-foreground">
          <p>hello@diranaturals.com</p>
          <p className="mt-1">© {new Date().getFullYear()} Dira Naturals</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
