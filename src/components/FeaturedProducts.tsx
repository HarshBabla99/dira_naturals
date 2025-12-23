import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

const FeaturedProducts = () => {
  const { t } = useLanguage();

  return (
    <section id="featured" aria-labelledby="featured-title" className="section scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 id="featured-title" className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug">
          {t("featuredCreations")}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
          {t("featuredSubtitle")}
        </p>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="card-lux hover-scale">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img src={p.image} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-3 sm:mt-4 font-serif text-base sm:text-lg">{p.name}</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
