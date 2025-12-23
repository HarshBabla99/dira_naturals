import heroImage from "@/assets/hero-soaps.jpg";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section aria-label="Hero" className="relative">
      <div className="relative h-[85vh] sm:h-[90vh] md:h-screen overflow-hidden">
        {/* Background Image with Ken Burns effect */}
        <img
          src={heroImage}
          alt="Luxurious artisanal handmade soap bars on natural stone"
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl space-y-6">
              {/* Tagline */}
              <p className="text-sm sm:text-base tracking-[0.2em] uppercase text-primary font-medium animate-fade-in">
                {t("artisanalSkincare")}
              </p>
              
              {/* Main heading */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {t("heroTitle")}
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t("heroSubtitle")}
              </p>
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Link to="/shop" className="btn text-center text-base px-8 py-4 hover-scale">
                  {t("shopNow")}
                </Link>
                <a href="#about" className="btn-ghost text-center text-base px-8 py-4">
                  {t("ourStory")}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs tracking-widest uppercase">{t("scroll")}</span>
            <div className="w-px h-8 bg-border relative overflow-hidden">
              <div className="absolute inset-x-0 h-1/2 bg-primary animate-[slide-down_1.5s_ease-in-out_infinite]" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
